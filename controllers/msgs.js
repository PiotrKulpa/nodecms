const Msgs = require('../models/msgs');

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

const getMsgs = async (req, res, next) => {
  // const paginationLimit = 2;
  // // const { id = 0 } = req.params;
  // const id = 0;
  // Msgs.find().lean().exec(function (err, posts) {
  //   if (err) return next(err);
  //   if (0 === posts.length) return next(new NotFoundError);
  //   // return res.end(JSON.stringify(posts));
  //   console.log(posts);
    
  //   return posts;
  // });
  const docs = await Msgs.find({}).lean();
  console.log(docs);
  return docs;
}

const getPostById = (req, res, next) => {
  const { id } = req.params;
  Post.findById({_id: id}, function (err, post) {
    if (err) return next(err);
    if (0 === post.length) return next(new NotFoundError);
    return res.end(JSON.stringify(post));
  });
}

const deletePostById = (req, res, next) => {
  const { id } = req.params;
  Post.deleteOne({_id: id}, function (err) {
    if (err) return next(err);
    return res.status(200).json({
      message: 'Post has been deleted'
    }).end();
  });
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
  getMsgs,
}