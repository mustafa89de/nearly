const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false, default: null},
  time: {type: Date, required: true},
  hostId: {type: String, required: true},
  loc: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

module.exports = mongoose.model('Event', eventSchema);