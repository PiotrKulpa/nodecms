const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Account = require('../models/account');
const saltRounds = 10;
const config = require('../config.json');
const { errorName } = require('../utilities/errorCodes');

const register =  async ({username, password}) => {
  
  const hash = bcrypt.hashSync(password, saltRounds);
     
  const account = new Account({
    username,
    password: hash
  });
      
  try {
    const result = await account.save();
    return result._doc;
  } catch(error) {    
    throw new Error(errorName.USER_ALREADY_EXISTS);
  }

}

const login = async (args, context) => {
  const { username, password } = args;
  const { res } = context;

  try {
    const user = await Account.findOne({ username });
    const valid = bcrypt.compareSync(password, user._doc.password);
    if(valid) {
      const token = jwt.sign(
        { id: user.id, username: user.email },
        config.jwtSecret,
        { expiresIn: '1d' }
      )
      res.cookie('token', token, { maxAge: 3600 * 1000 });
      return user._doc;
    }
  } catch (error) {
    throw new Error(errorName.NO_USER_FOUND);
  }
}

module.exports = {
  register,
  login,
}