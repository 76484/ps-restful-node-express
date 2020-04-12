const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  author: { type: String },
  genre: { type: String },
  isRead: { type: Boolean, default: false },
  title: { type: String },
});

module.exports = mongoose.model('Book', bookModel);
