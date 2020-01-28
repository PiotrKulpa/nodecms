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
  // const paginationLimit = 2;
  // // const { id = 0 } = req.params;
  // const id = 0;
  // Post.find().sort({ created_at: -1 }).skip(id * paginationLimit).limit(paginationLimit).lean().exec(function (err, posts) {
  //   if (err) return next(err);
  //   if (0 === posts.length) return next(new NotFoundError);
  //   // return res.end(JSON.stringify(posts));
  //   console.log(typeof posts[0].created_at);
    
  //   return posts;
  // });
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

const updatePostById = (req, res, next) => {
  const { id } = req.params;
  const { title, content, } = req.body;
  Post.updateOne({_id: id}, {
    title,
    content,
    img: req.files.featured.name,
    created_at: new Date().toISOString(),
  })
  .then(() => res.status(200).json({message: 'Post has been updated'}).end());
}

module.exports = {
  addPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
}