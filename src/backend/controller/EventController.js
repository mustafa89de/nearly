const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {name, description, location, time, hostId} = req.body;

    const createdEvent = await EventRepository.createEvent(name, location, time, hostId, description);

    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
