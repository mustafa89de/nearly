const UserController = require('./UserController');
const AuthenticationController = require('./AuthenticationController');
const EventController = require('./EventController');
const ParticipationController = require('./ParticipationController');
const PushController = require('./PushController');

const express = require('express');
const router = express.Router();

// connect specific routes
router.use('/user', UserController);
router.use('/login', AuthenticationController);
router.use('/event', EventController);
router.use('/participation', ParticipationController);
router.use('/push', PushController);

module.exports = router;
