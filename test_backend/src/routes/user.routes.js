const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const checkUserExistsMiddleware = require('../middleware/user/checkUserExists.middleware');
const authMiddleware = require('../middleware/user/auth.middleware')

router.post('/user/signUp', checkUserExistsMiddleware, userController.signUp);
router.post('/user/signIn', userController.signIn);
router.get('/user/profile', authMiddleware, userController.getProfile);
router.post('/user/signOut', userController.signOut);

module.exports = router;