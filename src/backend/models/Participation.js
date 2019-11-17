const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participationSchema = mongoose.Schema({
  userId: {type: String, required: true},
  eventId: {type: Schema.Types.ObjectId, ref: 'Event'}
});

module.exports = mongoose.model('Participation', participationSchema);