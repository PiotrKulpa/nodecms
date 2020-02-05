const jwt = require('jsonwebtoken');
const config = require('../config.json');

const checkJWTAuthentication = (id, context, info) => {
  // We can obtain the session token from the requests cookies, which come with every request
  //TODO: replace req by context, add next argument to exe method if success
  // const token = req.cookies.token;
  const { req: {cookies: {token = ''} = {} } = {} } = context;
  // console.log('token to', context.req.cookies.token);
  console.log(id);

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return 'Something is not right'
  }

  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, config.jwtSecret)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return 'JWT is unauthorized'
    }
    // otherwise, return a bad request error
    return 'JWT bad request error'
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  // or do next()
  return 'JWT authorization OK'
}

module.exports = checkJWTAuthentication;