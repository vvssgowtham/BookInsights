const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  email:{
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
});

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  submitted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Book = mongoose.model("book", BookSchema);
const User = mongoose.model("user", UserSchema);

module.exports = { Book, User };
