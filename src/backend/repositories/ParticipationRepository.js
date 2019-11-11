const Participation = require('../models/Participation');
const Event = require('../models/Event');
const User = require('../models/User');

class ParticipationRepository {
  async attendEvent(userId, eventId){
    try {
      let event = await Event.findById(eventId);
      let user = await User.findById(userId);

      if(!event || !user){
        return null;
      }
      let participation = Participation({userId, eventId});
      await participation.save();
      return participation;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new ParticipationRepository();