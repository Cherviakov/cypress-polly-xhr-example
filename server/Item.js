const mongoose = require('mongoose');

const { Schema } = mongoose;

const Item = new Schema(
  {
    _id: { type: String, maxLength: 256 },
    name: { type: String, required: true, maxLength: 256 },
  },
  {
    versionKey: false,
    _id: false
  }
);

module.exports = mongoose.model('Item', Item, 'items');
