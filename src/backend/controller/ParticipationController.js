const JWTService = require("../services/JWTService");
const ParticipationRepository = require('../repositories/ParticipationRepository');

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {userId, eventId} = req.body;
    const participation = await ParticipationRepository.attendEvent(userId, eventId);

    if(participation === null){
      res.status(404).json({message: `Event with id "${eventId}" 
      or User with with id "${userId}" does not exist.`});
    }

    res.status(201).json();
  } catch (err) {
    console.log(err.status);
    res.status(500).json({message: err.message})
  }
});


module.exports = router;