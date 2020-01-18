const AuthService = require('../services/AuthService');
const UserRepository = require("../repositories/UserRepository");
const EventRepository = require("../repositories/EventRepository");

const express = require('express');
const JWTService = require("../services/JWTService");
const router = express.Router();
const CONSTANTS = require('../constants');

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

router.get('/:id', JWTService.requireJWT(), async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await UserRepository.getUserById(id);

    if (!user) {
      res.status(404).json({message: `User with id "${id}" does not exist.`});
    }

    const {username, email, description, radius} = user;

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
      radius: radius || CONSTANTS.DEFAULT_MAP_RADIUS,
      hostedEvents: hostedEventsDto
    };

    if (id === req.user.id) {
      userDetails.email = email
    }

    res.json(userDetails);
  } catch
    (err) {
    res.status(500).json({message: err.message});
  }
});

router.put('/:id', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const userId = req.user.id;
    const {username, email, description} = req.body;
    await UserRepository.editUser(userId, username, email, description);
    res.json();
  } catch (err) {
    let resBody = {message: err.message};
    if (err.message.includes('duplicate key')) {
      if (err.message.includes('username_1')){
        resBody.dupKey= "username";
        res.status(409).json(resBody);
      }else if(err.message.includes('email_1')){
        resBody.dupKey= "email";
        res.status(409).json(resBody);
      }
    } else {
      res.status(500).json(resBody);
    }
  }
});

router.delete('/:id', JWTService.requireJWT(), AuthService.compareId, async (req, res) => {
  try {
    const {id} = req.params;
    await UserRepository.removeUser(id);
    res.json();
  } catch (err) {
    res.status(500).json({message: err.message})
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
    res.json(radius || CONSTANTS.DEFAULT_MAP_RADIUS);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
