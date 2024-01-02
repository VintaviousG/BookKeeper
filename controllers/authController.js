const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
//const passport = require('../passport'); // Adjust the path based on your project structure

const User = require("../models/User");


//Show Register Form
const showRegisterForm = (req, res) => {
    res.render('user/register');
};

//Register User, The Non Passport way. Same as creating a Admin and Book
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Hash Password using Bcrypt, get password from user and use Salt Round up to 10 to hash user password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create new User
        const user = new User.User({
            username,
            password: hashedPassword,
            email,
        });

        //Once done Save the user to the database
        await user.save();
        console.log(user)

        //Once saved and successful be
        //directed back to the login page
        res.redirect('/admin/users')
    } catch (error) {
        console.log(error);
        //res.render("error", { error });
    }
};

//Passport Register Example
const RegUser_Passport = (req, res, next) => {
 // Destructure the data from the request body
 const { username, password, email } = req.body;

 // Create a new user
 const newUser = new User.User({ username, email });

 // Register the user using Passport's register method
 User.User.register(newUser, password, (err, user) => {
   if (err) {
     console.error(err);
     return res.status(500).json({ error: err.message });
   }

   console.log(newUser)
   // Log in the user after registration
   passport.authenticate('local')(req, res, () => {
     res.status(200).json({ success: true, user });
   });
 });

}

const Login_PSExample_2 = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User.User({
      username,
      password: hashedPassword,
      email
    });

    // Save the user to the database
    await newUser.save();

    // Log in the user after registration using Passport
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        res.json({ message: 'Registration successful', user: newUser });
        console.log(newUser)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




//Proper way to export functions
exports.showRegisterForm = showRegisterForm;
exports.RegUser_PSExample = RegUser_PSExample;
exports.registerUser = registerUser;
exports.Login_PSExample_2 = Login_PSExample_2;
