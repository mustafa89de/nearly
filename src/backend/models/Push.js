const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushSchema = mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', index: {unique: true}},
  subscription: {
    endpoint: {
      type: String,
      required: true
    },
    keys: {
      p256dh: {
        type: String,
        required: true
      },
      auth: {
        type: String,
        required: true
      }
    }
  }
});

module.exports = mongoose.model('PushSubscriptions', pushSchema);