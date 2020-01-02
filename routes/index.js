// todo: move logic to controllers
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Account = require('../models/account');
const loginController = require('../controllers/login');
const logoutController = require('../controllers/logout');
const PostsController = require('../controllers/posts');
const jwtAuthController = require('../controllers/checkJWTAuthentication');

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

/* BLOG/POSTS CRUD METHODS */
router.get('/api/posts', PostsController.getPosts);
router.post('/api/addpost', PostsController.addPost);

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
