const Account = require('../models/account');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register =  ({username, password}) => {

  

  
    bcrypt.hash(password, saltRounds, async (err,   hash) => {

      const account = new Account({
        username,
        password: hash
      });

      const result = await account.save();
      console.log(result._doc);
      //TODO: fix returned type
      return result._doc;

   });
  

  

}

const login = async ({username, password}) => {

  Account.findOne({ username: username }, (err, account) => {
    console.log(account._doc);

    bcrypt.compare(password, account._doc.password, function(err, result) {
      // result == true
      console.log(err, result);

      //TODO: jwt.sign
  });
    
  });
  
  // return doc;

}

module.exports = {
  register,
  login,
}