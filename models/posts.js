const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    content: String,
    img: String
});


module.exports = mongoose.model('posts', Post);