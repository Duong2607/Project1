const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema(
    { 
        idUser: String,
        idClothing: String,
        nameClothing: String,
        priceClothing: Number,
        sizeClothing: String,
        count: Number,
        img: String
    }
);

module.exports = mongoose.model('Cart', Cart)