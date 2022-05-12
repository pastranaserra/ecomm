const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
};

const products = new Schema(fields);

module.exports = { Model: mongoose.model('products', products) };
