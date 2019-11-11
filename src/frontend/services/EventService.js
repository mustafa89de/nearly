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

  async getAllEvents({sw, ne}) {
    try {
      const response = await axios.get(ENDPOINTS.EVENT, {
        params: {
          sw_lat: sw.lat,
          sw_lon: sw.lng,
          ne_lat: ne.lat,
          ne_lon: ne.lng,
        }
      });
      return response.data
    } catch (err) {
      err.status = err.response ? err.response.status : null;
      console.error(err.message);
      throw err;
    }
  }

  async getEventById(eid) {
    try {
      const res = await axios.get(ENDPOINTS.EVENT + '/' + eid);
      return res.data;
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async signInForEvent(eid){
    try{
      await axios.post(ENDPOINTS.EVENTPARTICIPATION, {
        userId: AuthService.getUser().userId,
        eventId: eid
      });
    }catch(err){
      console.error(err.message);
      throw err;
    }
  }

  async signOutForEvent(eid){
    try{
      await axios.delete(ENDPOINTS.EVENTPARTICIPATION, {
        userId: AuthService.getUser().userId,
        eventId: eid
      });
    }catch(err){
      console.error(err.message);
      throw err;
    }
  }
}

export default new EventService();