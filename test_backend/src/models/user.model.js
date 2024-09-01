const db = require('../config/db.config');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    db.query(query, [
        userData.username,
        userData.email,
        userData.password
    ], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = User;