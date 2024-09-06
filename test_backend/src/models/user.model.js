const db = require('../config/db.config');
const bcrypt = require('bcrypt');

const User = {
  
  create: (userData, callback) => {

    bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      const query = 'INSERT INTO users (username, email, password, created_at, updated_at, firstname, lastname, role) VALUES (?, ?, ?, NOW(), NOW(), ?, ?, ?)';
      const values = [
        userData.username,
        userData.email,
        hashedPassword,
        userData.firstname || null,
        userData.lastname || null,
        userData.role || 'user'
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });

    });
    
  },

  findByEmail: (email, callback) => {

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });

  },

  findById: (id, callback) => {

    const query = 'SELECT id, username, email, firstname, lastname, created_at as createdAt, updated_at as updatedAt, role FROM users WHERE id = ?';

    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });

  }

};

module.exports = User;