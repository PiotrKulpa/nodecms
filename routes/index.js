const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Post = require('../models/posts');
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

//todo: get all posts

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
