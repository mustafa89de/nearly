const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false, default: null},
  location: {type: String, required: true},
  time: {type: Date, required: true},
  hostId: {type: String, required: true}
});

module.exports = mongoose.model('Event', eventSchema);