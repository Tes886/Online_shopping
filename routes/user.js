const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/signup', userController.getSignUpForm);

router.post('/signup', userController.saveUser);

module.exports = router;