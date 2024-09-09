// models/article.model.js
const db = require('../config/db.config');

const Article = {
  // Créer un article
  create: (articleData, callback) => {
    const query = 'INSERT INTO articles (title, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    const values = [articleData.title, articleData.description];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Lier les catégories à un article
  linkCategories: (articleId, categoryIds, callback) => {
    const query = 'INSERT INTO articles_categories (article_id, category_id) VALUES ?';
    const values = categoryIds.map(categoryId => [articleId, categoryId]);

    db.query(query, [values], (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  },

  // Obtenir tous les articles
  getAll: (callback) => {
    const query = 'SELECT * FROM articles';

    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Obtenir un article par ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM articles WHERE id = ?';

    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },

  // Mettre à jour un article
  update: (id, articleData, callback) => {
    const query = 'UPDATE articles SET title = ?, description = ? WHERE id = ?';
    const values = [articleData.title, articleData.description, id];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Supprimer un article
  delete: (id, callback) => {
    const query = 'DELETE FROM articles WHERE id = ?';

    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Obtenir les articles par catégorie
  getArticlesByCategory: (categoryId, callback) => {
    const query = `
      SELECT a.id, a.title, a.description
      FROM articles a
      JOIN articles_categories ac ON a.id = ac.article_id
      WHERE ac.category_id = ?
    `;

    db.query(query, [categoryId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Article;