const AuthService = require('../services/AuthService');
const UserRepository = require("../repositories/UserRepository");
const EventRepository = require("../repositories/EventRepository");

const express = require('express');
const JWTService = require("../services/JWTService");
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {username, email, password, description} = req.body;
    await UserRepository.createUser(username, email, password, description);
    res.status(201).json();
  } catch (err) {
    if (err.message.includes('duplicate key')) {
      res.status(409).json({message: err.message});
    } else {
      res.status(500).json({message: err.message});
    }
  }
});


/*
* ### RESPONSE ###
* Object: {
*   username: String,
*   description: String,
*   hostedEvents: ArrayOf(
*     id: String,
*     name: String,
*     description: String,
*     time: DateTimeString,
*     radius: Float,
*     longitude: Float,
*     latitude: Float
*   )
* }
*/

router.get('/:id', JWTService.requireJWT(), async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await UserRepository.getUserById(id);

    if (!user) {
      res.status(404).json({message: `User with id "${id}" does not exist.`});
    }

    const {username, description, radius} = user;

    const hostedEvents = await EventRepository.getEventsByHost(id);

    const hostedEventsDto = hostedEvents.map(({loc, description, name, id, time}) => ({
        id,
        name,
        description,
        time,
        longitude: loc.coordinates[0],
        latitude: loc.coordinates[1]
      }
    ));


    const userDetails = {
      username,
      description,
      radius,
      hostedEvents: hostedEventsDto
    };

    res.json(userDetails);
  } catch
    (err) {
    res.status(500).json({message: err.message});
  }
});

router.put('/:id/homePosition', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const userId = req.user.id;
    const {longitude, latitude} = req.body;
    const homePosition = {
      type: "Point",
      coordinates: [longitude, latitude]
    };
    await UserRepository.setHomePosition(userId, homePosition);
    res.json();
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:id/homePosition', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const homePosition = await UserRepository.getHomePosition(req.user.id);
    res.json(homePosition);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.put('/:id/radius', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const userId = req.user.id;
    const {radius} = req.body;
    await UserRepository.setRadius(userId, radius);
    res.json();
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:id/radius', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const radius = await UserRepository.getRadius(req.user.id);
    res.json(radius);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
