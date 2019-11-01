import axios from 'axios';
import {ENDPOINTS} from "../constants";

class AuthService {

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

export default new AuthService();