const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");
const MapService = require("../services/MapService");

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

router.get('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {north, east, west, south} = req.body;
    const events = MapService.getEventsInArea(north, east, south, west);
    res.status(201).json(events);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
