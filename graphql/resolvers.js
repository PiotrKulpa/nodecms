
const PostsController = require('../controllers/posts');
const MsgsController = require('../controllers/msgs');
const checkJWTAuthentication = require('../controllers/checkJWTAuthentication');

var myTab = [{id: 1, name: "Piotr"}, {id: 2, name: "Ala"}];
var fakeDatabase = {};

const root = {
  hello: (args, context) => checkJWTAuthentication({context, cb: ()=>'cb f() here'}),
  hello2: () => 'Hello world2!',
  findUser: ({id}) => myTab.filter((el) => el.id === id)[0], //resolver takes arguments, they are passed as one “args” object, as the first argument to the function
  setMessage: ({message}) => {
    fakeDatabase = {...fakeDatabase, message};
    console.log(fakeDatabase);
    return message;
  },
  addPost: ({title, content, img}) => PostsController.addPost(title, content, img),
  getPosts: PostsController.getPosts,
  getPostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.getPostById}),
  deletePostById: (args, context) => checkJWTAuthentication({args, context, cb: PostsController.deletePostById}),
  updatePostById: ({id, title, content, img}) => PostsController.updatePostById(id, title, content, img),
  getMsgs: MsgsController.getMsgs
};

module.exports = root;