// controllers/article.controller.js
const Article = require('../models/article.model');

// Créer Article
exports.createArticle = (req, res) => {
  const { title, description, categoryIds } = req.body;

  // Vérifier que les categories sont fournies
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'At least one category ID is required' });
  }

  // Créer l'article
  const articleData = { title, description };
  Article.create(articleData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating article', error: err });
    }

    const articleId = result.insertId;

    // Associer l'article aux catégories
    Article.linkCategories(articleId, categoryIds, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error linking article to categories', error: err });
      }

      res.status(201).json({ message: 'Article created successfully', articleId });
    });
  });
};

// Obtenir les articles d'une catégorie spécifique
exports.getArticlesByCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  console.log("Category ID received in controller:", categoryId);

  Article.getArticlesByCategory(categoryId, (err, articles) => {
    if (err) {
      console.error("Error retrieving articles:", err);
      return res.status(500).json({ message: 'Error retrieving articles', error: err });
    }

    console.log("Articles retrieved from database:", articles);
    res.status(200).json(articles);
  });
};

// Get all articles
exports.getAllArticles = (req, res) => {
    Article.getAll((err, articles) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving articles', error: err });
      }
  
      res.status(200).json(articles);
    });
  };

// Get article by ID
exports.getArticleById = (req, res) => {
    const articleId = req.params.id;
  
    Article.getById(articleId, (err, article) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving article', error: err });
      }
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(article);
    });
  };

// Update article
exports.updateArticle = (req, res) => {
    const articleId = req.params.id;
    const { title, description, categoryIds } = req.body;
  
    // Vérifier que les données sont fournies
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
  
    // Mettre à jour l'article
    const articleData = { title, description };
    Article.update(articleId, articleData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating article', error: err });
      }
  
      // Mettre à jour les associations de catégories si `categoryIds` est fourni
      if (categoryIds && categoryIds.length > 0) {
        Article.linkCategories(articleId, categoryIds, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error linking article to categories', error: err });
          }
  
          res.status(200).json({ message: 'Article updated successfully' });
        });
      } else {
        res.status(200).json({ message: 'Article updated successfully' });
      }
    });
  };
  
// Delete article
exports.deleteArticle = (req, res) => {
    const articleId = req.params.id;
  
    Article.delete(articleId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting article', error: err });
      }
  
      res.status(200).json({ message: 'Article deleted successfully' });
    });
  };  