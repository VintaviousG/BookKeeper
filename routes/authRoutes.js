//These will the routes for this file
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);

module.exports = router;
