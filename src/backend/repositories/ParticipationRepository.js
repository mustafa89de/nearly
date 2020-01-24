const Participation = require('../models/Participation');
const Event = require('../models/Event');
const User = require('../models/User');

class ParticipationRepository {
  async attendEvent(userId, eventId) {
    try {
      let event = await Event.findById(eventId);
      let user = await User.findById(userId);

      if (!event || !user) {
        return null;
      }

      if (await this.checkIfParticipant(userId, eventId)) {
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

  async checkIfParticipant(userId, eventId) {
    try {
      let participation = await Participation.findOne({
        userId: userId,
        eventId: eventId
      });

      if (!participation) return false;
      return true;

    } catch (err) {
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

  async getUserParticipations(userId) {
    try {
      const participations = await Participation.find({
        userId: userId
      }).populate('eventId');

      const events = participations.map(participation => {
        const event = participation._doc.eventId._doc;
        return {
          id: event._id,
          name: event.name,
          description: event.description,
          longitude: event.loc.coordinates[0],
          latitude: event.loc.coordinates[1],
          time: event.time,
          hostId: event.hostId
        }
      });
      return events;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async countParticipations(eventId) {
    try {
      return await Participation.count({eventId});
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new ParticipationRepository();