const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    email: { type: String, maxLength: 255  },
    first_Name: { type: String, maxLength: 600  },
    last_Name: { type: String, maxLength: 255 },
    password: { type: String},
    createAt: { type: Date, default: Date.now},
    UpdateAt: { type: Date, default: Date.now},

  });

  module.exports = mongoose.model('Client', Client);
