'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

// open the database
const db = require('./db');



//get all tasks
exports.listAllQuestions = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM questions';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const questions = rows.map((question) => ({ id: question.id, question: question.question, questiontype: question.questiontype,
      num: question.num, min: question.min, max: question.max, answ1:question.answ1,
      answ2:question.answ2,answ3:question.answ3,answ4:question.answ4,answ5:question.answ5,
      answ6:question.answ6,answ7:question.answ7,answ8:question.answ8,answ9:question.answ9,
      answ10:question.answ10, survey_id: question.survey_id, order: question.order

    }));
        resolve(questions);
      });
    });
  };


  exports.createQuestion=(question)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO questions(question, questiontype, num, min, max, one, two, three, four, five, six, seven, eight, nine, ten, [order], [survey_id]) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
      //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';
  
      db.run(sql, [question.question, question.questiontype,question.num, question.min, question.max, question.one, question.two, question.three, question.four, question.five, question.six, question.seven, question.eight, question.nine, question.ten, question.order, question.survey_id],  function(err){
        if(err){
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID)
      });
    });
  };


  // for answers



  exports.createSubmissions=(submission)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO answers(responder, survey_id) VALUES(?,?)'
      //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';
  
      db.run(sql, [submission.responder, submission.survey_id], function(err){
        if(err){
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID)
      });
    });
  };

  exports.listAllSubmissions = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM answers';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const answers = rows.map((answer) => ({ id: answer.id, responder: answer.responder, survey_id: answer.survey_id
    }));
        resolve(answers);
      });
    });
  };
