import axios from 'axios';
const JWT = require('jsonwebtoken');

import {ENDPOINTS} from "../constants";

class AuthService {

    async login(email, password){
        try{
            const res = await axios.post(ENDPOINTS.LOGIN, {
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

    async isAuthenticated(){
        const token = localStorage.getItem('jwt-token');
        if(token === undefined) return false;
        try{
            await axios.get(ENDPOINTS.JWTTEST,  { Authorization: token });
            console.log('user authorized');
            return true;
        }catch(err){
            err.status = err.response.status;
            console.error(err.message);
            throw err;
        }

    }
}

export default new AuthService();