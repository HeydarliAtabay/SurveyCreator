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
        const questions = rows.map((question) => ({ id: question.id, text: question.text, type: question.type,
      num: question.num, min: question.min, max: question.max, answ1:question.answ1,
      answ2:question.answ2,answ3:question.answ3,answ4:question.answ4,answ5:question.answ5,
      answ6:question.answ6,answ7:question.answ7,answ8:question.answ8,answ9:question.answ9,
      answ10:question.answ10, survey_id: question.survey_id, order: question.order

    }));
        resolve(questions);
      });
    });
  };

  exports.createSurvey=(survey)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO surveys(title, numRespond, published, user) VALUES(?,?,?,?)'
      //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';
  
      db.run(sql, [survey.title,survey.numRespond, survey.published,survey.user], function(err){
        if(err){
          reject(err);
          return;
        }
        console.log(this.lastID);
        resolve(this.lastID)
      });
    });
  };