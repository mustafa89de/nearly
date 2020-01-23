const express = require('express');
const router = express.Router();
const JWTService = require('../services/JWTService');

router.post('/', JWTService.requireCredentials(), async (req, res) => {
    try {
        const token = JWTService.signToken(req.user);
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;