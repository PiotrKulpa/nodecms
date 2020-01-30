const Post = require('../models/posts');

const addPost = async (title, content, img) => {

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
  console.log(docs);
  return docs;
}

const getPostById = async (id) => {
  const result = await Post.findById(id);
  return result;
}

const deletePostById = async (id) => {
  const result = await Post.deleteOne({_id: id});
  return result;
}

const updatePostById = async (id, title, content, img) => {
  const res = await Post.updateOne({ _id: id }, { title, content });  
  return res.nModified;
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
}