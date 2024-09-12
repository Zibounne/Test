const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const categoryController = require('../controllers/category.controller');
const articleController = require('../controllers/article.controller');

const checkUserExistsMiddleware = require('../middleware/user/checkUserExists.middleware');
const { authenticateToken } = require('../middleware/user/auth.middleware');

////////////////////////// Route //////////////////////////

/* =========== Auth =========== */

router.post('/user/signUp', checkUserExistsMiddleware, userController.signUp);
router.post('/user/signIn', userController.signIn);
router.post('/user/signOut', userController.signOut);

// Route pour rafraîchir le token
router.post('/user/token', userController.refreshToken);

/* ========== Profile ========= */

router.get('/user/profile', authenticateToken, userController.getProfile);

/* ========== Category ======== */

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

/* =========== Article ======== */
router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);
router.get('/category/:categoryId/articles', articleController.getArticlesByCategory);

module.exports = router;