const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Account = require('../models/account');
const saltRounds = 10;
const config = require('../config.json');

const register =  ({username, password}) => {
 
    bcrypt.hash(password, saltRounds, async (err,   hash) => {

      const account = new Account({
        username,
        password: hash
      });

      const result = await account.save();
      //TODO: fix returned type
      return result._doc;

   });
  
}

const login = async (args, context) => {
  const { username, password } = args;
  const { res } = context;

  const user = await Account.findOne({ username });

  if (!user) {
    console.log('No user with that username');
  }
  
  const valid = await bcrypt.compare(password, user._doc.password);

  if (!valid) {
    console.log('Incorrect password');
  }

  const token = jwt.sign(
    { id: user.id, username: user.email },
    config.jwtSecret,
    { expiresIn: '1d' }
  )

  res.cookie('token', token, { maxAge: 3600 * 1000 });

}

module.exports = {
  register,
  login,
}