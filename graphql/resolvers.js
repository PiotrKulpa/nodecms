
const AccountController = require('../controllers/account');
const PostsController = require('../controllers/posts');
const checkJWTAuthentication = require('../controllers/checkJWTAuthentication');

const root = {
  hello: ()=> 'test f() here',
  login: (args, context) => AccountController.login(args, context),
  register: (args, context) => AccountController.register(args, context),
  addPost: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.addPost}),
  getPosts: PostsController.getPosts,
  getPostById: ({id}) => PostsController.getPostById(id),
  deletePostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.deletePostById}),
  updatePostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.updatePostById}),
};

module.exports = root;