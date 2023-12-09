const bcrypt = require("bcrypt");
const User = require("../models/User");

//Show Register Form
const showRegisterForm = (req, res) => {
    res.render('user/register');
};

//Register User
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
        //res.redirect('/login')
    } catch (error) {
        console.log(error);
        //res.render("error", { error });
    }
};

//Proper way to export functions


exports.showRegisterForm = showRegisterForm;
exports.registerUser = registerUser;
