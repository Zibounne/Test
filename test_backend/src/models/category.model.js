const db = require('../config/db.config');

const Category = {
  create: (categoryData, callback) => {
    const query = 'INSERT INTO categories (title, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    const values = [
      categoryData.title,
      categoryData.description
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM categories';
    
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM categories WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },

  update: (id, categoryData, callback) => {
    const query = 'UPDATE categories SET title = ?, description = ? WHERE id = ?';
    const values = [
      categoryData.title,
      categoryData.description,
      id
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = Category;