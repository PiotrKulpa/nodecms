const jwt = require('jsonwebtoken');

const config = require('../config.json');

const jwtSign = (user, res) => {
  const token = jwt.sign(user.toJSON(), config.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: 3600 // in seconds
  });
console.log(token);

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: 3600 * 1000 });
  res.end(token);
}

module.exports = jwtSign;