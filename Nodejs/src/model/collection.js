const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Collection = new Schema({
    avatar: {type: String},
    image1_for_slider: {type: String},
    image2_for_slider: {type: String},
    image_for_girl: {type: String},
    image_for_men: {type: String},
    child_avatar: {type: String},
    name: {type: String},
    createAt: { type: Date, default: Date.now},
    UpdateAt: { type: Date, default: Date.now},

  });

  module.exports = mongoose.model('Collection', Collection);
