const PushSubscriptions = require('../models/Push');

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const push = PushSubscriptions({userId, subscription});
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId){
    try {
      const removal = PushSubscriptions.deleteOne({
        id: userId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new PushRepository();