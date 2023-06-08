const querystring = require('querystring');
const passport = require('passport');
const User = require('../models/user');


module.exports.signinurl = (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err || !user) {
            console.log('Error in finding user:', err);
            return res.redirect('/users/sign-in');
        }

        const { email, password } = user;

        const signInParams = querystring.stringify({
            email: email,
            password: password
        });
        
        const signInURL = `http://localhost:8000/users/sign-in?${signInParams}`;
        
        return res.render('signinurl', {
            title: "Codeial | Sign Up",
            signInURL: signInURL
        });
    });
};



module.exports.signIn = function(req, res) {
  const email = req.query.email;
  const password = req.query.password;

  // Find the user with the provided email
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      console.log('Error in finding user:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!user || !user.isValidPassword(password)) {
      // User not found or password doesn't match
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User found and password matches, perform the sign-in
    req.login(user, function(err) {
      if (err) {
        console.log('Error in login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Successful login
      return res.redirect('/users/profile');
    });
  });
};
