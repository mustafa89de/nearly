const UserController = require('./UserController');
const AuthenticationController = require('./AuthenticationController');

const express = require('express');
const router = express.Router();

// connect specific routes
router.use('/user', UserController);  // Path chaining -> /api/user/...
router.use('/login', AuthenticationController);

module.exports = router;
