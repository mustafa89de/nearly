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

    async login(email, password){
        try{
            await axios.post(ENDPOINTS.LOGIN, {
                email,
                password
            })
        }catch(err){
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }
    }
}

export default new UserService();