const Post = require('../models/posts');
const { errorName } = require('../utilities/errorCodes');

const addPost = async ({title, content, img}) => {

  const post = new Post({
    title,
    content,
    img,
    created_at: new Date().toISOString(),
  });

  try {
    const result = await post.save();
    return result;
  } catch (error) {
    if (title && content && img) {
      throw new Error(errorName.SERVER_ERROR);
    } else {
      throw new Error(errorName.ADD_POST);
    }
  }
}

const getPosts = async () => {
  const docs = await Post.find({}).lean();
  return docs;
}

const getPostById = async (id) => {
  const result = await Post.findById(id);
  return result;
}

const deletePostById = async ({id}) => {
  try {
    const result = await Post.deleteOne({_id: id});
    return result.deletedCount;
  } catch (error) {
    if(!id) throw new Error(errorName.WRONG_ARGS);
    throw new Error(errorName.NO_POST_FOUND);
  }
}

const updatePostById = async (args) => {
  const id = args.id;
  delete args.id;
  try {
    const res = await Post.updateOne({ _id: id }, args);  
    return res.nModified;
  } catch (error) {
    if(!id || !args.title || !args.content || !args.img) throw new Error(errorName.WRONG_ARGS);
    throw new Error(errorName.NO_POST_FOUND);
  }
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
}