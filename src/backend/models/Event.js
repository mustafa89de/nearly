const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false, default: null},
  latitude: {type: mongoose.Decimal128, required: true},
  longitude: {type: mongoose.Decimal128, required: true},
  time: {type: Date, required: true},
  hostId: {type: String, required: true}
});

module.exports = mongoose.model('Event', eventSchema);