// todo: move logic to controllers
const express = require('express');
const passport = require('passport');
const Post = require('../models/posts');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Account = require('../models/account');
const loginController = require('../controllers/login');
const logoutController = require('../controllers/logout');
const jwtAuthController = require('../controllers/checkJWTAuthentication');

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

//get all posts
router.get('/api/posts', (req, res) => {
  Post.find().sort({ created_at: -1 }).lean().exec(function (err, posts) {
    return res.end(JSON.stringify(posts));
  })
  // res.render('panel', { });
});

router.get('/panel', (req, res) => {
  res.render('panel', {});
});

router.post('/panel', (req, res) => {
  const { title, content, } = req.body;
  console.log(title, content, req.files.featured.name);

  const post = new Post({
    title,
    content,
    img: req.files.featured.name,
    created_at: new Date().toISOString()
  });
  post.save().then(() => console.log('post has been saved'));
  res.render('panel', {});
});

router.get('/register', (req, res) => {
  res.render('register', {});
});

router.post('/register', (req, res, next) => {
  Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      return res.render('register', { error: err.message });
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
  res.render('login', { user: req.user, error: req.flash('error') });
});

/* POST login. */
router.post('/login', loginController);

/* test JWT authorization */
router.post('/profile', jwtAuthController, (req, res) => {
  res.send('checkJWTAuthentication works fine');
});

/* POST logout. */
router.post('/logout', logoutController);

router.get('/ping', (req, res) => {
  res.status(200).send("pong!");
});

module.exports = router;
