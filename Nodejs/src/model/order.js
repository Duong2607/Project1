const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    { 
        idUser: String,
        phoneNumber: String,
        address: String,
        cart: Array,
        fullName: String,
        price: String,
        status: Boolean,
        delivery: Boolean,
        email: String,
        paymentMethods: String
    }
);

module.exports = mongoose.model('Order', Order)