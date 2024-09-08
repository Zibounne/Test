const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const categoryController = require('../controllers/category.controller');

const checkUserExistsMiddleware = require('../middleware/user/checkUserExists.middleware');
const authMiddleware = require('../middleware/user/auth.middleware')

////////////////////////// Route //////////////////////////

/* =========== Auth =========== */

router.post('/user/signUp', checkUserExistsMiddleware, userController.signUp);
router.post('/user/signIn', userController.signIn);
router.post('/user/signOut', userController.signOut);

/* ========== Profile ========= */

router.get('/user/profile', authMiddleware, userController.getProfile);

/* ========== Category ======== */

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;