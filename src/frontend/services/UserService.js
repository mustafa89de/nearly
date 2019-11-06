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
}

export default new UserService();