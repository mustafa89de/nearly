import axios from 'axios';
import {ENDPOINTS} from "../constants";

class UserService {
    async register(username, email, password) {
        try {
            await axios.post(ENDPOINTS.USER, {
                username,
                email,
                password
            })
        } catch (err) {
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }
    }

    async getUserByID(uid){
        try{
            const res = await axios.get(ENDPOINTS.USER + '/' + uid);
            return res.data;
        }catch(err){
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }
    }

    async getUserById(uid){
        try{
            const res = await axios.get(ENDPOINTS.USER + "/"+ uid);
            return res.data;
        } catch(err){
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }
    }

  async saveHomePosition(homePosition) {
    console.log('save home position', homePosition);
    return Promise.resolve() // TODO: fetch endpoint and update homePosition in FE
  }
}

export default new UserService();