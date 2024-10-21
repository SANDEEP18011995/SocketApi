const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    },
  },
  address: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  street: String,
  city: String,
  state: String,
  country: String,
  loginId: {
    type: String,
    required: true,
    minlength: 8,
    match: /^[a-zA-Z0-9]{8,}$/
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(v);
      },
      message: props => `Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character, and be at least 6 characters long!`
    }
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
