const { errorType } = require('./errorCodes')

const getErrorCode = errorName => {
  return errorType[errorName]
}

module.exports = getErrorCode