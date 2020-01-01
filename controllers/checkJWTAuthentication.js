const jwt = require('jsonwebtoken');

const checkJWTAuthentication = (req, res, next) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token;

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).json({
      message: 'Something is not right',
    }).end()
  }

  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, 'your_jwt_secret')
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).json({
        message: 'Something is not right',
      }).end();
    }
    // otherwise, return a bad request error
    return res.status(400).json({
      message: 'Something is not right',
    }).end()
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  // or do next()
  next();
}

module.exports = checkJWTAuthentication;