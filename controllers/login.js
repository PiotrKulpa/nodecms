const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config.json');
const jwtSign = require('./jwtSign');


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
      
      jwtSign(user, res);

    });
  })(req, res);
}

module.exports = login;

