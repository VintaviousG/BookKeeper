//These will the routes for this file
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Make sure to adjust the path based on your project structure

passport.use(new LocalStrategy(User.User.authenticate()));

passport.serializeUser(User.User.serializeUser());
passport.deserializeUser(User.User.deserializeUser());

router.use(passport.initialize());
router.use(passport.session());


const authController = require('../controllers/authController')

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);


// Your login route (add this if not already present)
//passport.authenticate('local'),
router.get('/login',  (req, res) => {
    // This function will be called if authentication succeeds
  //res.json({ message: 'Login successful', user: req.user });
  res.render('user/login');
  console.log('On Login Page Route');
});
  
 router.post('/login', passport.authenticate('local'),  (req, res, next) => {

  res.json({ message: 'Login successful', user: req.user });

 })

 router.get('/user/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});


module.exports = router;
