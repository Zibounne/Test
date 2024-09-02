const db = require('../config/db.config');
const bcrypt = require('bcrypt');

const User = {
  create: (userData, callback) => {

    bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      const query = 'INSERT INTO users (username, email, password, created_at, updated_at, firstname, lastname) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)';
      db.query(query, [
        userData.username,
        userData.email,
        hashedPassword,
        userData.firstname,
        userData.lastname
      ], (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
    });
  }
};

module.exports = User;