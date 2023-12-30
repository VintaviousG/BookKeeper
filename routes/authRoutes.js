//These will the routes for this file
const express = require('express');
const router = express.Router();
const passport = require('../passport'); // Adjust the path based on your project structure


const authController = require('../controllers/authController')

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.RegUser_PSExample);

module.exports = router;
