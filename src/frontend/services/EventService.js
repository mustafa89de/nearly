import axios from 'axios';
import {ENDPOINTS} from "../constants";
import AuthService from "./AuthService";

class EventService {
  async createEvent(name, description, latitude, longitude, time) {
    try {
      const userId = AuthService.getUser().userId;

      await axios.post(ENDPOINTS.EVENT, {
        name,
        description: description || null,
        latitude,
        longitude,
        time,
        hostId: userId
      })
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async getAllEvents([p1,p2]) {
    // an mocked event in the center of the bounds
    const eventsMock = [
      {
        lon: (p1.lon + p2.lon) / 2,
        lat: (p1.lat + p2.lat) / 2
      }
    ];
    return Promise.resolve(eventsMock);
  }

  async getEventById(eid){
    try{
      const res = await axios.get(ENDPOINTS.EVENT + '/' + eid);
      return res.data;
    }catch(err){
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }
}

export default new EventService();