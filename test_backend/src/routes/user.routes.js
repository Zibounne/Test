const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const checkUserExists = require('../middleware/auth.middleware');


router.post('/user/create', checkUserExists, userController.createUser);

module.exports = router;