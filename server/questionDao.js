'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

// open the database
const db = require('./db');



//GET all question
exports.listAllQuestions = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM questions ORDER by [order] ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const questions = rows.map((question) => ({ id: question.id, question: question.question, questiontype: question.questiontype,
      num: question.num, min: question.min, max: question.max, one:question.one,
      two:question.two,three:question.three,four:question.four,five:question.five,
      six:question.six,seven:question.seven,eight:question.eight,nine:question.nine,
      ten:question.ten, survey_id: question.survey_id, order: question.order

    }));
        resolve(questions);
      });
    });
  };


  exports.getQuestionsOfSurvey = function (surveyId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from questions WHERE survey_id=?";
        db.all(sql, [surveyId], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
  };

// ADD a question
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


  // DELETE existing question with a given id
exports.deleteQuestion = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM questions WHERE id = ?';
      db.run(sql, [id], (err) => {
          if(err)
              reject(err);
          else 
              resolve(null);
      })
  });
}

// For answers

exports.listAllAnswers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM submissions';
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
  // for submissions


  
  exports.listAllSubmissions = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM submissions';
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

  exports.createSubmissions=(submission)=>{
    return new Promise((resolve, reject)=>{
      const sql = 'INSERT INTO submissions(responder, survey_id) VALUES(?,?)'
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


  exports.getSubmissionCount = function (survey) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS c FROM submissions WHERE survey_id = ?";
        db.get(sql, [survey], (err, row) => {
            const value = row.c;
            if(err) reject(err);
            else resolve(value);
        });
    });
}


exports.getSubmissionOfSurvey = function (surveyId) {
  return new Promise((resolve, reject) => {
      const sql = "SELECT * from submissions WHERE survey_id=?";
      db.all(sql, [surveyId], (err, rows) => {
          if(err) reject(err);
          else resolve(rows);
      });
  });
};

// for answers

exports.listAllAnswers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM answers';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      else resolve(rows);
    });
  });
};


exports.getAnswersOfSurvey = function (surveyId) {
  return new Promise((resolve, reject) => {
      const sql = "SELECT * from answers WHERE survey_id=?";
      db.all(sql, [surveyId], (err, rows) => {
          if(err) reject(err);
          else resolve(rows);
      });
  });
};

exports.createAnswer=(question)=>{
  return new Promise((resolve, reject)=>{
    const sql = 'INSERT INTO answers(submission_id, survey_id, question_id, questiontype, answer, one, two, three, four, five, six, seven, eight, nine, ten) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    //const sql= 'INSERT INTO tasks(description,user) VALUES(?,?))';

    db.run(sql, [question.submission_id, question.survey_id,question.question_id, question.questiontype, question.answer, question.one, question.two, question.three, question.four, question.five, question.six, question.seven, question.eight, question.nine, question.ten],  function(err){
      if(err){
        reject(err);
        return;
      }
      console.log(this.lastID);
      resolve(this.lastID)
    });
  });
};