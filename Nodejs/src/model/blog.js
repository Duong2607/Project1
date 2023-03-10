const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
avatar: {type: String},
content: {type: Object},
name: {type: String},

  });

  module.exports = mongoose.model('Blog', Blog);
