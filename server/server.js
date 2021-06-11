'use strict';

const express = require('express');
const app = new express();
const PORT = 3001;
const morgan = require('morgan');


const surveyDao = require('./surveyDao'); // module for accessing the DB for tasks

app.use(morgan('dev'))
app.use(express.json())

app.get('/',(req, res)=>{
    res.send(`Hi from the server, which is running on  http://localhost:${PORT}/`)
})
app.get('/api/surveys', (req,res)=>{
  surveyDao.listAllSurveys()
      .then((surveys)=>{res.json(surveys)})
      .catch((error)=>{res.status(500).json(error)} )
})

// init express


// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});