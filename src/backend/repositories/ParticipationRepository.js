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

      if(this.checkIfParticipant(userId, eventId)){
        return null
      }

      let participation = Participation({userId, eventId});
      await participation.save();
      return participation;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async checkIfParticipant(userId, eventId){
    try{
      let participation = await Participation.findOne({
        userId: userId,
        eventId: eventId
      });

      if(!participation) return false;
      return true;

    }catch(err){
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new ParticipationRepository();