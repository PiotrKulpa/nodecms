// todo: move logic to controllers
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Account = require('../models/account');
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');
const logoutController = require('../controllers/logout');
const PostsController = require('../controllers/posts');
const jwtAuthController = require('../controllers/checkJWTAuthentication');

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

/* BLOG/POSTS CRUD METHODS */
router.get('/api/posts', PostsController.getPosts);
router.get('/api/post/:id', PostsController.getPostById);
router.post('/api/addpost', PostsController.addPost);
router.post('/api/deletepost/:id', PostsController.deletePostById);
router.post('/api/updatepost/:id', PostsController.updatePostById);

/* POST register. */
router.post('/register', registerController);

/* POST login. */
router.post('/login', loginController);

/* test JWT authorization */
router.post('/profile', jwtAuthController, (req, res) => {
  res.send('checkJWTAuthentication works fine');
});

/* POST logout. */
router.post('/logout', logoutController);

// router.get('/register', (req, res) => {
//   res.render('register', {});
// });

// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user, error: req.flash('error') });
// });

module.exports = router;
