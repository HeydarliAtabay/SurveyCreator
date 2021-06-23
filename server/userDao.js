'use strict'

const db = require('./db');


const bcrypt= require('bcrypt')

// getting user by id

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
            const user = {id: row.id, username: row.email, name: row.name}
            resolve(user);
          }
      });
    });
  };

// getting user  

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined) {
            resolve(false);
          }
          else {
            const user = {id: row.id, username: row.email, name: row.name};
              
            // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
            bcrypt.compare(password, row.hash).then(result => {
              if(result)
                resolve(user);
              else
                resolve(false);
            });
          }
      });
    });
  };