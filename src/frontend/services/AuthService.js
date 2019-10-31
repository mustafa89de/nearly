import axios from 'axios';
import {ENDPOINTS} from "../constants";

class AuthService {

    async login(email, password){
        try{
            await axios.post(ENDPOINTS.LOGIN, {
                email,
                password
            })
            localStorage.setItem('jwt-token', res.data.token);
        }catch(err){
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }
    }

    isAuthenticated(){
        if(localStorage.getItem('jwt-token') === undefined){
            // still missing: check if token expired
            return true;
        }else return false;
    }
}

export default new AuthService();