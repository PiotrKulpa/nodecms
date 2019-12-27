const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Posts = require('../models/posts');
const router = express.Router();

// authentication check
const checkAuthentication = (req,res,next) => {
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect("/login");
  }
}

router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/panel', checkAuthentication, (req, res) => {
    res.render('panel', { });
});

router.post('/addpost', checkAuthentication, (req, res) => {
  //TODO: logic for adding post to db
  const post = new Post({ 
    name: 'Zildjian',
    content: 'ble ble',
    img: 'myimg/bleble'
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

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

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
