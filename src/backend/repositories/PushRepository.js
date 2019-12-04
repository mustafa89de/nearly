const Push = require('../models/Push');

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const push = Push({userId, subscription});
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId){
    try {
      const removal = Push.deleteOne({
        _id: userId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}