//These will the routes for this file
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

//get route for register form
router.get('/register', authController.showRegisterForm);
//when user submit form post to this route
router.post('/register', authController.passportUserRegister);


// Your login route (add this if not already present)
//passport.authenticate('local'),
router.get('/login',  (req, res) => {
    // This function will be called if authentication succeeds
  //res.json({ message: 'Login successful', user: req.user });
  res.render('user/login');
  console.log('On Login Page Route');
});
  


//how to use Passport js and MongoDB together

module.exports = router;
