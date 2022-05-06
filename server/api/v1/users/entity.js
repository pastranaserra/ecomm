const mongoose = require('mongoose');
const { isEmail } = require('validator');

const hiddenFields = {
  password: {
    type: String,
    required: true,
  },
};

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
  ...hiddenFields,
};

const userSchema = new mongoose.Schema(explicitFields, { timestamps: true });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  const hiddenFieldNames = Object.keys(hiddenFields);
  hiddenFieldNames.forEach((fieldName) => delete userJson[fieldName]);
  return userJson;
};

module.exports = {
  User: mongoose.model('User', userSchema),
};
