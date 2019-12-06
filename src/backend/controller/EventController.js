const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");
const UserRepository = require("../repositories/UserRepository");
const ParticipationRepository = require("../repositories/ParticipationRepository");
const MapService = require("../services/MapService");
const AuthService = require("../services/AuthService");
const PushRepo = require('../repositories/PushRepository');
const PushService = require('../services/PushService');

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {name, description, latitude, longitude, time, hostId} = req.body;
    const loc = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const createdEvent = await EventRepository.createEvent(name, time, hostId, description, loc);

    const pushes = await PushRepo.getAllSubs();

    const payload = JSON.stringify({title: 'New Nearly Event', body: name, data: hostId});
    pushes.forEach(push => {
      PushService.sendPush(push._doc.subscription, payload)
    });

    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {sw_lat, sw_lon, ne_lat, ne_lon} = req.query;

    const ne = {
      lat: parseFloat(ne_lat),
      lng: parseFloat(ne_lon)
    };

    const sw = {
      lat: parseFloat(sw_lat),
      lng: parseFloat(sw_lon)
    };

    const missingBounds = MapService.createMissingBounds(ne, sw);
    const [se, nw] = missingBounds;
    const events = await EventRepository.getEventsInArea(ne, se, sw, nw);

    const eventsDto = events.map(event => ({
      lat: event.loc.coordinates[1],
      lon: event.loc.coordinates[0],
      description: event.description,
      title: event.name,
      time: event.time,
      hostId: event.hostId,
      id: event.id
    }));

    res.json(eventsDto);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:eid', JWTService.requireJWT(), async (req, res) => {
  try {

    const event = await EventRepository.getEventById(req.params.eid);

    if (!event) res.status(404).json({message: "The requested event does not exist!"});

    const {id, name, description, time, loc, hostId} = event;

    const user = await UserRepository.getUserById(event.hostId);
    const username = user ? user.username : null;

    const isParticipant = await ParticipationRepository.checkIfParticipant(req.user.id, event.id);

    const resData = {
      id,
      name,
      description,
      time,
      lat: loc.coordinates[1],
      lon: loc.coordinates[0],
      hostId,
      hostName: username,
      isParticipant: isParticipant
    };

    res.status(200).json(resData);
  } catch (err) {
    console.log(err.status, err);
    res.status(500).json({message: err.message});
  }
});

router.put('/:id', JWTService.requireJWT(), AuthService.compareHostId, async (req, res) =>{
  try {
    const eventId = req.params.id;
    const {name, time, description, longitude, latitude} = req.body;
    await EventRepository.updateEvent(eventId, name, time, description, longitude, latitude);
    res.json();
  }catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/:id', JWTService.requireJWT(), AuthService.compareHostId, async (req, res) =>{
  try {
    const eventId = req.params.id;
    const removal = await EventRepository.deleteEvent(eventId);
    if (!removal){
      res.status(404).json({message: `Deletion of event with eventId: ${eventId} unsuccessful`})
    }
    res.json();
  } catch (err) {
    console.log(err.status);
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
