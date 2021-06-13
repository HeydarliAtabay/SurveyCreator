'use strict';

const express = require('express');
const app = new express();
const PORT = 3001;
const morgan = require('morgan');


const surveyDao = require('./surveyDao'); // module for accessing the DB for surveys
const questionDao = require('./questionDao'); // module for accessing the DB for questions

app.use(morgan('dev'))
app.use(express.json())

app.get('/',(req, res)=>{
    res.send(`Hi from the server, which is running on  http://localhost:${PORT}/`)
})

// for Surveys

app.get('/api/surveys', (req,res)=>{
  surveyDao.listAllSurveys()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

app.post('/api/surveys', (req,res) => {
  const survey = req.body;
  if(!survey){
      res.status(400).end();
  } else {
      surveyDao.createSurvey(survey)
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

// for Questions

app.get('/api/questions', (req,res)=>{
  questionDao.listAllQuestions()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

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

app.get('/api/submissions/survey/:id', async (req,res)=>{
    const surveyId = req.params.id
    questionDao.getSubmissionOfSurvey(surveyId)
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(500).json({errors: [{'msg': err}] }));
});


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});