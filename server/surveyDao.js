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