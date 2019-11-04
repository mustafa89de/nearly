const geolib = require('geolib');
const EventRepository = require('../repositories/EventRepository');

class MapService{
  async getEventsInArea(north, east, south, west){
    try {
      let area = [
        {latitude: north.lat, longitude: north.lng},
        {latitude: east.lat, longitude: east.lng},
        {latitude: west.lat, longitude: west.lng},
        {latitude: south.lat, longitude: south.lng},
      ];

      let events = await EventRepository.getAllEvents();
      /*
      events.filter(event => {
        const eventCoordinates = {
          latitude: event.latitude,
          longitude: event.longitude
        };
        return geolib.isPointInPolygon(eventCoordinates, area);
      });
*/
      let eventObjects = [];
      events.forEach(event => {
        const eventCoordinates = {
          latitude: event.latitude,
          longitude: event.longitude
        };
        const inArea = geolib.isPointInPolygon(eventCoordinates, area);
        if(inArea) {
          eventObjects.push({
            lon: event.longitude,
            lat: event.latitude
          })
        }
      });
      return eventObjects;

    } catch (err) {
      throw err;
    }
  }
}

module.exports = new MapService();