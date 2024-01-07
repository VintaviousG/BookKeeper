const express = require('express');
const router = express.Router();

//passport package
const passport = require('passport');
const User = require("../models/User");


//Show Register Form
const showRegisterForm = (req, res) => {
    res.render('user/register');
};

//Register User, The Non Passport way. Same as creating a Admin and Book
// const registerUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         //Hash Password using Bcrypt, get password from user and use Salt Round up to 10 to hash user password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         //Create new User
//         const user = new User.User({
//             username,
//             password: hashedPassword,
//             email,
//         });

//         //Once done Save the user to the database
//         await user.save();
//         console.log(user)

//         //Once saved and successful be
//         //directed back to the login page
//         res.redirect('/admin/users')
//     } catch (error) {
//         console.log(error);
//         //res.render("error", { error });
//     }
// };

//Passport Register Example
  //the user is no longer using email for register just username and password
const passportUserRegister = (req, res) => {
 // Destructure the data from the request body
 User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
  if (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
  passport.authenticate('local')(req, res, () => {
      res.json({
          success: true,
  
      });
      console.log(req.body.username)
  });
});
}






//Proper way to export functions
exports.showRegisterForm = showRegisterForm;
exports.passportUserRegister = passportUserRegister;
//exports.registerUser = registerUser;
