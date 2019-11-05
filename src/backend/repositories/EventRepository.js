const Event = require('../models/Event');

class EventRepository {
  async createEvent(name, time, hostId, description, location) {
    try {
      let event = Event({name, description, time, hostId, location});
      await event.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getAllEvents(){
    try {
      let [events] = await Promise.all([Event.find({})]);
      return events;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getEventsInArea(point1, point2, point3, point4) {
    try {
      return await Event.find(
        {
          loc: {
            $geoWithin: {
              $geometry: {
                type : "Polygon" ,
                coordinates: [ [
                  [ point1.lng, point1.lat ],
                  [ point2.lng, point2.lat ],
                  [ point3.lng, point3.lat ],
                  [ point4.lng, point4.lat ],
                  [ point1.lng, point1.lat ]
                ] ]
              }
            }
          }
        }
      )
    }catch (err) {
      console.error('DB Error:', err.message);
    }
  }
}

module.exports = new EventRepository();