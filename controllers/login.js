const passport = require('passport');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret', {
        algorithm: 'HS256',
        expiresIn: 3600 // in seconds
      });
      console.log('token to: ', token);

      // set the cookie as the token string, with a similar max age as the token
      // here, the max age is in milliseconds, so we multiply by 1000
      res.cookie('token', token, { maxAge: 3600 * 1000 });
      res.end();
    });
  })(req, res);
}

module.exports = login;

