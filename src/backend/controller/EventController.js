const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {name, description, latitude, longitude, time, hostId} = req.body;

    const createdEvent = await EventRepository.createEvent(name, latitude, longitude, time, hostId, description);

    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:eid', JWTService.requireJWT(), async (req, res) => {
  try{
    const event = await EventRepository.getEventById(req.params.eid);
    if(event === null){
      res.status(404).json({message: "The requested event does not exist."})
    }else{
      res.status(200).json(event);
    }
  }catch(err){
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
