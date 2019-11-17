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

      if(await this.checkIfParticipant(userId, eventId)){
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

  async cancelAttendance(userId, eventId) {
    try {
      let removal = await Participation.deleteOne({
        userId: userId,
        eventId: eventId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getUserParticipations(userId){
    try {
      const participations = await Participation.find({
        userId: userId
      });

      const events = [];
      if (participations) {
        for (const participation of participations) {
          const eventId = participation.eventId;
          const event = await Event.find({
            _id: eventId,
            time: {
              $gte: new Date()
            }
          });
          events.push(event);
        }
      }
      events.sort((a, b) => {
        const aTime = a[0]._doc.time;
        const bTime = b[0]._doc.time;
        return new Date(aTime) - new Date(bTime);
      });
      return events;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new ParticipationRepository();