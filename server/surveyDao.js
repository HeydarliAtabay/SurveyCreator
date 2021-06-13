'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

// open the database
const db = require('./db');



//get all tasks
exports.listAllSurveys = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM surveys';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const surveys = rows.map((survey) => ({ id: survey.id, title: survey.title, numRespond: survey.numRespond,
      published: survey.published, user:survey.user  }));
        resolve(surveys);
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

// DELETE existing question with a given id
exports.deleteSurvey = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM surveys WHERE id = ?';
      db.run(sql, [id], (err) => {
          if(err)
              reject(err);
          else 
              resolve(null);
      })
  });
}