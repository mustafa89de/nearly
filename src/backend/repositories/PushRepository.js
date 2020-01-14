const PushSubscriptions = require('../models/PushSubscription');
const Event = require('../models/Event');
const EARTH_RADIUS = 6378.1;

class PushRepository {
  async saveSubscription(userId, subscription, deviceFingerprint) {
    try {
      const subscriptionJSON = JSON.parse(subscription);
      const push = PushSubscriptions({
        userId: userId,
        subscription: subscriptionJSON,
        deviceFingerprint: deviceFingerprint
      });
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId, deviceFingerprint) {
    try {
      const removal = await PushSubscriptions.deleteOne({
        userId,
        deviceFingerprint
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getSubscriptionsOfInterestedUsers(eventId, hostId) {
    try {

      //get all subscriptions, populate with user objects
      const allSubscriptions = await PushSubscriptions.find().populate('userId');

      let relevantSubscriptions = (await Promise.all(
        allSubscriptions.map(async (subscription) => {
          //get user lat/lng from every subscription
          const userLocation = subscription._doc.userId._doc.homePosition.coordinates;
          const userId = subscription._doc.userId._id.toString();
          const lng = userLocation[0];
          const lat = userLocation[1];
          let userRadius = subscription._doc.userId._doc.radius;
          if (userRadius !== null) {
            userRadius = userRadius / 1000;
          } else {
            userRadius = 1; //default 1km
          }
          //check if event is within radius of user
          //returns list with length == 0 if not in radius, e.g. no event with eventId in this radius
          //list length > 0 if in radius
          const eventInUserRadius = await Event.find({
            _id: eventId,
            loc: {
              $geoWithin: {
                $centerSphere: [[lng, lat], userRadius / EARTH_RADIUS]
              }
            }
          });
          //if in radius and user not host, add subscription to list (else undefined is added to list)
          if (eventInUserRadius.length > 0 && userId !== hostId) {
            return subscription._doc.subscription;
          }
        })
        //remove undefined list elements
      )).filter(subscription => subscription !== undefined);

      return relevantSubscriptions;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async isSubscribed(userId, deviceFingerprint){
    try {
      let subscription = await PushSubscriptions.findOne({
        userId: userId,
        deviceFingerprint: deviceFingerprint
      });

      return subscription;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async updateSubscription(userId, subscription, deviceFingerprint) {
    try {
      const subscriptionJSON = JSON.parse(subscription);
      await PushSubscriptions.findOneAndUpdate({
        userId: userId,
        deviceFingerprint: deviceFingerprint
      }, {
        subscription: subscriptionJSON
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

module.exports = new PushRepository();