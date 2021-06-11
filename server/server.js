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

// for Questions

app.get('/api/questions', (req,res)=>{
  questionDao.listAllQuestions()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});