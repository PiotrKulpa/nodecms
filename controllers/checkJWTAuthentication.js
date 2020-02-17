const jwt = require('jsonwebtoken');
const config = require('../config.json');
const { errorName } = require('../utilities/errorCodes');

const checkJWTAuthentication = ({args = {}, context, cb}) => {
  
  const { req: {cookies: {token = ''} = {} } = {} } = context;
  
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    throw new Error(errorName.AUTH_REQUIRED);
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
      throw new Error(errorName.AUTH_REQUIRED);
    }
    // otherwise, return a bad request error
    throw new Error(errorName.SERVER_ERROR);
  }
  // Finally, execute callback, along with their
  // username given in the token
  return cb(args);
}

module.exports = checkJWTAuthentication;