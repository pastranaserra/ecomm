const mongoose = require('mongoose');
const { isEmail } = require('validator');

const explicitFields = {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => isEmail(value),
      message: () => 'Invalid email',
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
};

const userSchema = new mongoose.Schema(explicitFields, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
};
