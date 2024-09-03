const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const checkUserExistsMiddleware = require('../middleware/user/checkUserExists.middleware');

router.post('/user/signUp', checkUserExistsMiddleware, userController.signUp);
router.post('/user/signIn', userController.signIn);

module.exports = router;