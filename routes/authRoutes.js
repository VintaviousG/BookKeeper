//These will the routes for this file
const express = require('express');
const router = express.Router();
const passport = require('../passport'); // Adjust the path based on your project structure

// Configure Passport local strategy
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


const authController = require('../controllers/authController')

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.Login_PSExample_2);

//router.post('/login', passport.authenticate('local'),)

// Your login route (add this if not already present)
router.post('/login', passport.authenticate('local'), (req, res) => {
    // This function will be called if authentication succeeds
    res.json({ message: 'Login successful', user: req.user });
  });

module.exports = router;
