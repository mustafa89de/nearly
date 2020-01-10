const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  description: {type: String, required: false, default: null},
  homePosition: {
    type: {
      type: String,
      enum: ['Point', null],
      required: false,
      default: null
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  radius: {type: Number, required: false, default: null}
});

module.exports = mongoose.model('User', userSchema);