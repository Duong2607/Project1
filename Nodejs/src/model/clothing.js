const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Clothing = new Schema({
    name: { type: String, maxLength: 255  },
    img: {type: String},
    price: {type: Number},
    type: {type: String},
    color: {type: String},
    sum_size_1: {type: Number},
    sum_size_2: {type: Number},
    sum_size_3: {type: Number},
    sum_size_4: {type: Number},
    

  });

  module.exports = mongoose.model('Clothing', Clothing);
