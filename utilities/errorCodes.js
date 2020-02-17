exports.errorName = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  NO_USER_FOUND: 'NO_USER_FOUND',
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  ADD_POST: 'ADD_POST',
  NO_POST_FOUND: 'NO_POST_FOUND',
  WRONG_ARGS: 'WRONG_ARGS',
  SERVER_ERROR: 'SERVER_ERROR'
}

exports.errorType = {
  USER_ALREADY_EXISTS: {
    message: 'User is already exists.',
    statusCode: 403
  },
  NO_USER_FOUND: {
    message: 'No user found with that username or password.',
    statusCode: 403
  },
  AUTH_REQUIRED: {
    message: 'You are not authorized. Please login to Your account.',
    statusCode: 401
  },
  ADD_POST: {
    message: 'Can not add post. Please check all required fields.',
    statusCode: 401
  },
  NO_POST_FOUND: {
    message: 'Can not find post with that id.',
    statusCode: 401
  },
  WRONG_ARGS: {
    message: 'Please fill all required fields.',
    statusCode: 401
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  },
}