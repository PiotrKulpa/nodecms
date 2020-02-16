exports.errorName = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  NO_USER_FOUND: 'NO_USER_FOUND',
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
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  },
}