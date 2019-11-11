const Participation = require('../models/Participation');
const Event = require('../models/Event');

class ParticipationRepository {
  async attendEvent(userId, eventId){
    try {
      let event = await Event.findById(eventId);
      if(!event){
        return undefined;
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