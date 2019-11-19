const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true},
  password: {type: String, required: true}, // TODO: maybe hide it in JSON
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
  }
});

module.exports = mongoose.model('User', userSchema);