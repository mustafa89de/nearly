const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTService = require('../services/JWTService');

//jwt-authentication for token authentication/validation
//if token invalid/not authentic, automatically responds with 401 with body{Unauthorized}
const passportJWT = passport.authenticate('jwt', {session: false});

//local authentication for email/password
//if any are incorrect, automatically responds with 401 with body{Unauthorized}
const passportLocal = passport.authenticate('local', {session: false});

router.post('/', passportLocal, async (req, res, next) => {
    //generate token
    try {
        const token = JWTService.signToken(req.user);
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// secure route for testing, only accessible with valid token
router.get('/secure', passportJWT, async (req, res, next) => {
    try {
        console.log('managed to get here');
        res.json({secret: 'resource'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;