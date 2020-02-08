
const PostsController = require('../controllers/posts');
const checkJWTAuthentication = require('../controllers/checkJWTAuthentication');

const root = {
  hello: (args, context) => checkJWTAuthentication({context, cb: ()=>'cb f() here'}),
  addPost: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.addPost}),
  getPosts: PostsController.getPosts,
  getPostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.getPostById}),
  deletePostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.deletePostById}),
  updatePostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.updatePostById}),
};

module.exports = root;