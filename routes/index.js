// todo: move logic to controllers
const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Post = require('../models/posts');
const router = express.Router();
const jwt = require('jsonwebtoken');

// local authentication check
const checkAuthentication = (req,res,next) => {
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect("/login");
  }
}

// jwt authentication
const checkJWTAuthentication = (req, res, next) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token

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

router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

//get all posts
router.get('/api/posts', (req, res) => {
  Post.find().sort({created_at: -1}).lean().exec(function (err, posts) {
    return res.end(JSON.stringify(posts));
  })
    // res.render('panel', { });
});


router.get('/panel', checkAuthentication, (req, res) => {
    res.render('panel', { });
});

router.post('/panel',  (req, res) => {
  const { title, content, } = req.body;
  console.log(title, content, req.files.featured.name);
  
  const post = new Post({ 
    title,
    content,
    img: req.files.featured.name,
    created_at: new Date().toISOString()
   });
  post.save().then(() => console.log('post has been saved'));
  res.render('panel', { });
});

router.get('/register', (req, res) => {
    res.render('register', { });
});

router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

/* POST login. */
// we pass {session: false} in passport options, so that it wont save the user in the session.
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user   : user
          });
      }
     req.login(user, {session: false}, (err) => {
         if (err) {
             res.send(err);
         }
         // generate a signed son web token with the contents of user object and return it in the response
         const token = jwt.sign(user.toJSON(), 'your_jwt_secret', {
          algorithm: 'HS256',
          expiresIn: 3600 // in seconds
        });
        console.log('token to: ', token);
        
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie('token', token, { maxAge: 3600 * 1000 });
        res.end();
      });
  })(req, res);
});

router.post('/profile', checkJWTAuthentication,
    (req, res) => {
        res.send('checkJWTAuthentication works fine');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
