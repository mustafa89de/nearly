const mongoose = require('mongoose');
const Event = require('./Event');
const PushSubscription = require('./PushSubscription');
const Participation = require('./Participation');

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

userSchema.post('deleteOne', function () {
  const userId = this.getQuery()._id;
  PushSubscription.deleteMany({userId: userId}).exec();
  Event.deleteMany({hostId: userId}).exec();
  Participation.deleteMany({userId: userId}).exec();
});

module.exports = mongoose.model('User', userSchema);