const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// routes for authentication
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
