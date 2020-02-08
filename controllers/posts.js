const Post = require('../models/posts');

const addPost = async ({title, content, img}) => {

  const post = new Post({
    title,
    content,
    img,
    created_at: new Date().toISOString(),
  });

  const result = await post.save();
  return result;

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
  const result = await Post.deleteOne({_id: id});
  return result.deletedCount;
}

const updatePostById = async (args) => {
  const id = args.id;
  delete args.id
  const res = await Post.updateOne({ _id: id }, args);  
  return res.nModified;
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
}