const mongoose = require('mongoose');
const { Products } = require('./productModel');

const { Schema } = mongoose;

const fields = {
  'user cart': [Products],
};

const references = {
  // creates references from other models
  userId: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
};

const userCart = new Schema(fields);

module.exports = { UserCart: mongoose.model('userCart', userCart), references };
