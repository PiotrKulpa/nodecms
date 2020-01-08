const passport = require('passport');

const Account = require('../models/account');
const jwtSign = require('./jwtSign');

const register = (req, res, next) => {
console.log(req.body);

  Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      return res.render('register', { error: err.message });
    }

    passport.authenticate('local')(req, res, () => {
      jwtSign(account, res);
    });
  });

}

module.exports = register;