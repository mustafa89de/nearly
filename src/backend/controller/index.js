const UserController = require('./UserController');
const EventController = require('./EventController');

const express = require('express');
const router = express.Router();

// connect specific routes
router.use('/user', UserController);
router.use('/event', EventController);

module.exports = router;
