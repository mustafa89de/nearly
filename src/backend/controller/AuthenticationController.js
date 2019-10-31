const express = require('express');
const router = express.Router();
const JWTService = require('../services/JWTService');

router.post('/', JWTService.requireCredentials(), async (req, res, next) => {
    //generate token
    try {
        const token = JWTService.signToken(req.user);
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// secure route for testing, only accessible with valid token
router.get('/secure', JWTService.requireJWT(), async (req, res, next) => {
    try {
        console.log('managed to get here');
        res.json({secret: 'resource'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;