const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
avatar: {type: String},
content: {type: Object},
// content1: {type: String},
// img_content1: {type: String},
// content2: {type: String},
// img_content2: {type: String},
// content3: {type: String},
// img_content3: {type: String},
// content4: {type: String},
// img_content4: {type: String},
// content5: {type: String},
// img_content5: {type: String},
// content6: {type: String},
// img_content6: {type: String},
// content7: {type: String},
// img_content7: {type: String},
name: {type: String},

  });

  module.exports = mongoose.model('Blog', Blog);
