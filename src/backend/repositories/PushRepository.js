const PushSubscriptions = require('../models/PushSubscription');
const Event = require('../models/Event');
const EARTH_RADIUS = 6378.1;

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const subscriptionJSON = JSON.parse(subscription);
      const push = PushSubscriptions({
        userId: userId,
        subscription: subscriptionJSON
      });
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId) {
    try {
      const removal = await PushSubscriptions.deleteOne({
        userId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getSubscriptionsOfInterestedUsers(eventId) {
    try {

      //get all subscriptions, populate with user objects
      const allSubscriptions = await PushSubscriptions.find().populate('userId');

      let relevantSubscriptions = (await Promise.all(
        allSubscriptions.map(async (subscription) => {
          //get user lat/lng from every subscription
          const userLocation = subscription._doc.userId._doc.homePosition.coordinates;
          const lng = userLocation[0];
          const lat = userLocation[1];
          const radius = 1; // 1km, replace with subscription._doc.userId._doc.homePosition.radius / 1000
          //check if event is within radius of user
          //returns list with length == 0 if not in radius, e.g. no event with eventId in this radius
          //list length > 0 if in radius
          const eventInUserRadius = await Event.find({
            _id: eventId,
            loc: {
              $geoWithin: {
                $centerSphere: [[lng, lat], radius / EARTH_RADIUS]
              }
            }
          });
          //if in radius, add subscription to list (else undefined is added to list)
          if (eventInUserRadius.length > 0) {
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
}

module.exports = new PushRepository();