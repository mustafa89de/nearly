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