// middleware/auth.js
module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();  // Proceed if user is authenticated
        }
        res.redirect('/auth/user/login');  // Redirect to login page if not authenticated
    }
};
