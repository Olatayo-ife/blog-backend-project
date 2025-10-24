const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validators = require('../utils/validators');

router.post('/register', validators.registerValidation, authController.register);
router.post('/login', validators.loginValidation, authController.login);

module.exports = router;
