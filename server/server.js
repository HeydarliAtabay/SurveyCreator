'use strict';

const express = require('express');
const app = new express();
const PORT = 3001;
const morgan = require('morgan');

const userDao = require('./userDao') // module for accessing the DB of users
const surveyDao = require('./surveyDao'); // module for accessing the DB for surveys
const questionDao = require('./questionDao'); // module for accessing the DB for questions

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session= require('express-session')

app.use(morgan('dev'))
app.use(express.json())

app.get('/',(req, res)=>{
    res.send(`Hi from the server, which is running on  http://localhost:${PORT}/`)
})

// for user authentication

passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    }).catch(err=>{
        done(err)
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// checking whether the user is authenticated or not
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'not authenticated'});
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'Ondan ona ondan ona, cay verun limonnan ona',
  resave: false,
  saveUninitialized: false 
}));

// tell passport to use session cookies
app.use(passport.initialize())
app.use(passport.session())

// for Surveys

app.get('/api/surveys', (req,res)=>{
  surveyDao.listAllSurveys()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

app.get('/api/surveys/user', isLoggedIn, async (req, res) => {
  try {
    const tasks = await surveyDao.listUserSurveys(req.user.id);
    res.json(tasks);
  } catch(err) {
    res.status(500).json("Getting Tasks from server was unsuccesful   "+ error) ;
  }
});

app.post('/api/surveys', isLoggedIn, (req,res) => {
  const survey = req.body;
  if(!survey){
      res.status(400).end();
  } else {
      surveyDao.createSurvey(survey, req.user.id)
          .then((id) => res.status(201).json({"id" : id}))
          .catch((err) => res.status(500).json(error),
      );
  }
});

app.delete('/api/surveys/delete/:surveyId', (req,res) => {
    const id= req.params.surveyId
  surveyDao.deleteSurvey(id)
      .then((id) => res.status(204).json(`Selected task with id:${id} was deleted`))
      .catch((err) => res.status(500).json(`Error while deleting the task with id:${req.params.id}  `+err),
      );
});

app.put('/api/surveys/update/published/:surveyId',  async(req,res) => {
    const id = req.params.surveyId;
    try{
        let task=await surveyDao.publishSurvey(id)
        res.json(`Survey with id: ${id} was published`)
    }
    catch(error){
        res.status(500).json(`Error while updating the status of the task with id: ${id}   `+ error)
    }

});

app.put('/api/surveys/update/:survey', async (req, res) => {
 
    const id=req.params.survey
  
    try {
      const result = await surveyDao.updateNumRespond(id);
      res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of task ${req.params.id}` });
    }
  
  });

// for Questions

app.get('/api/questions', (req,res)=>{
  questionDao.listAllQuestions()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

app.get('/api/questions/survey/:id', async (req,res)=>{
    const surveyId = req.params.id
    questionDao.getQuestionsOfSurvey(surveyId)
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(500).json({errors: [{'msg': err}] }));
});

app.post('/api/questions', (req,res) => {
    const submission = req.body;
    if(!submission){
        res.status(400).end();
    } else {
        questionDao.createQuestion(submission)
            .then((id) => res.status(201).json({"id" : id}))
            .catch((err) => res.status(500).json(err),
        );
    }
  });

  app.put('/api/questions/update/order/down/:order/:questionId',  async(req,res) => {
    const order= req.params.order
    const id = req.params.questionId;
    try{
        let task=await questionDao.moveDownQuestion(order,id)
        res.json(`Order of the question with id: ${id}  was changed to ${order}`)
    }
    catch(error){
        res.status(500).json(`Error while updating the status of the task with id: ${id}   `+ error)
    }

});


  app.delete('/api/questions/delete/:questionId', (req,res) => {
      const id= req.params.questionId
    questionDao.deleteQuestion(id)
        .then((id) => res.status(204).json(`Selected task with id:${id} was deleted`))
        .catch((err) => res.status(500).json(`Error while deleting the task with id:${req.params.questionId}  `+err),
        );
});
  
  

//for Submissions
app.get('/api/submissions', (req,res)=>{
  questionDao.listAllSubmissions()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

app.post('/api/submissions', (req,res) => {
  const submission = req.body;
  if(!submission){
      res.status(400).end();
  } else {
      questionDao.createSubmissions(submission)
          .then((id) => res.status(201).json({"id" : id}))
          .catch((err) => res.status(500).json(error),
      );
  }
});

app.get('/api/submissions/number/:id', async (req,res)=>{
    const id= req.params.id;
    try{
        let task=await questionDao.getSubmissionCount(id)
        res.json(task)
    }
    catch(error){
        res.status(500).json(`Cannot get a task with selected id:${id}   `+ error)
    }
})

app.get('/api/submissions/number/:id', async (req,res)=>{
    const id= req.params.id;
    try{
        let task=await questionDao.getSubmissionCount(id)
        res.json(task)
    }
    catch(error){
        res.status(500).json(`Cannot get a task with selected id:${id}   `+ error)
    }
})

app.get('/api/submissions/number/', async (req,res)=>{
    try{
        let count=await questionDao.getCountOfResponders()
        res.json(count)
    }
    catch(error){
        res.status(500).json(`Cannot get a task with selected id:${id}   `+ error)
    }
})

app.get('/api/submissions/survey/:id', async (req,res)=>{
    const surveyId = req.params.id
    questionDao.getSubmissionOfSurvey(surveyId)
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(500).json({errors: [{'msg': err}] }));
});


// for ANswers
app.get('/api/answers', (req,res)=>{
    questionDao.listAllAnswers()
        .then((answers)=>{res.json(answers)})
        .catch((error)=>{res.status(500).json(error)} )
  })

  app.get('/api/answers/survey/:id/:submission', async (req,res)=>{
    const surveyId = req.params.id
    const submissionId=req.params.submission
    questionDao.getAnswersOfSurvey(surveyId, submissionId)
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(500).json({errors: [{'msg': err}] }));
});

app.post('/api/answers', (req,res) => {
    const answer = req.body;
    if(!answer){
        res.status(400).end();
    } else {
        questionDao.createAnswer(answer)
            .then((id) => res.status(201).json({"id" : id}))
            .catch((err) => res.status(500).json(error),
        );
    }
  });

//   app.put('/api/answers/update/:string/:questionId/:submission',  async(req,res) => {
//     const string = req.params.string
//     const submission=req.params.submission
//     const questionId=req.params.questionId
//     try{
//         let task=await questionDao.updateAnswerClosed(string,questionId,submission)
//         res.json(`Status of question with id: ${questionId}  was changed to 1, where submission: ${submission} and choice is `)
//     }
//     catch(error){
//         res.status(500).json(`Error while updating the status of the task with id: ${id}   `+ error)
//     }

// });

app.put('/api/answers/update/:question/:submission', async (req, res) => {
 
  const answer = {
    one:req.body.one,
    two: req.body.two,
    three: req.body.three,
    four: req.body.four,
    five: req.body.five,
    six: req.body.six,
    seven: req.body.seven,
    eight: req.body.eight,
    nine: req.body.nine,
    ten: req.body.ten,
  };

  try {
    const result = await questionDao.updateAnswer(answer, req.params.question, req.params.submission);
    res.json(result); 
  } catch (err) {
    res.status(503).json({ error: `Database error during the update of task ${req.params.id}` });
  }

});

app.put('/api/answers/updateopen/:question/:submission', async (req, res) => {
 
    const answer = {
      answer:req.body.answer
    };
  
    try {
      const result = await questionDao.updateOpenAnswer(answer, req.params.question, req.params.submission);
      res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of task ${req.params.id}` });
    }
  
  });

  app.put('/api/answers/updatestatus/:question/:submission', async (req, res) => {
 
    try {
      const result = await questionDao.updateAnswerStatus(req.params.question, req.params.submission);
      res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of task ${req.params.id}` });
    }
  
  });

  // delete answer 

  app.delete('/api/answers/delete/:questionId/:submissionId', (req,res) => {
    const id= req.params.questionId
    const submission= req.params.submissionId
  questionDao.deleteAnswer(id, submission)
      .then((id) => res.status(204).json(`Selected answer with question id:${id} was deleted`))
      .catch((err) => res.status(500).json(`Error while deleting the task with id:${req.params.questionId}  `+err),
      );
});  


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// ALTERNATIVE: if we are not interested in sending error messages...
/*
app.post('/api/sessions', passport.authenticate('local'), (req,res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});
*/

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});



// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});