const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");
const MapService = require("../services/MapService");

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {name, description, time, hostId, location} = req.body;

    const createdEvent = await EventRepository.createEvent(name, time, hostId, description, location);

    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', JWTService.requireJWT(), async (req, res) => {
  try {

    res.status(201).json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
