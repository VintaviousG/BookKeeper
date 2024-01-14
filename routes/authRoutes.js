//These will the routes for this file
const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../config/auth');
const router = express.Router();

//get route for register form
router.get('/register', authController.showRegisterForm);
//when user submit form post to this route
router.post('/register', authController.passportUserRegister);


// Your login route (add this if not already present)
//passport.authenticate('local'),
router.get('/user/login',  (req, res) => {
    // This function will be called if authentication succeeds
  //res.json({ message: 'Login successful', user: req.user });
  res.render('user/login');
  console.log('On Login Page Route');
});
  
// Handle login logic
router.post('/user/login', authController.passportLoginUser);

//User Dashed after logging in
router.get('/user/dashboard', isLoggedIn, (req, res) => {
  res.render('user/dashboard', {user: req.user});
});

module.exports = router;
