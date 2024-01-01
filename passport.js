const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//User Model Example
const User = require('./models/User');

passport.use(new LocalStrategy(User.User.authenticate()));

passport.serializeUser(User.User.serializeUser());
passport.deserializeUser(User.User.deserializeUser());

module.exports = passport;