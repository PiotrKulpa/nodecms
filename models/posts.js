const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
    created_at: {type: Date, required: true}
});


module.exports = mongoose.model('posts', Post);