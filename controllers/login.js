const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config.json');
const jwtSign = require('./jwtSign');


const login = async (args, context) => {
  const {req, res} = context;

  const { user } = await context.authenticate('graphql-local', { username, password });
  console.log('user');
      await context.login(user);
      console.log(user);
      
      return { user }
  // TODO fix passport auth, check if credentials are ok
  
  // passport.authenticate('local', { session: false },  (err, user, info) => {
  //   console.log(err, user, info);
    
  //   if (err || !user) {
  //     return res.status(400).json({
  //       message: 'Something is not right',
  //       user: user
  //     });
  //   }
  //   req.login(user, { session: false }, (err) => {
      
  //     if (err) {
  //       res.send(err);
  //     }
      
  //     jwtSign(user, res);

  //   });
  // })(args,{req, res});
}

module.exports = login;

