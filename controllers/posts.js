const Post = require('../models/posts');

const addPost = (req, res) => {
  const { title, content, } = req.body;

  const post = new Post({
    title,
    content,
    img: req.files.featured.name,
    created_at: new Date().toISOString()
  });

  post.save().then(() => {
    return res.status(200).json({
      message: 'Post has been added'
    }).end();
  });
}

const getPosts = (req, res, next) => {
  Post.find().sort({ created_at: -1 }).lean().exec(function (err, posts) {
    if (err) return next(err);
    if (0 === posts.length) return next(new NotFoundError);
    return res.end(JSON.stringify(posts));
  });
}

module.exports = {
  addPost,
  getPosts,
}