const UserController = require('./UserController');

const express = require('express');
const router = express.Router();

// connect specific routes
router.use('/user', UserController);  // Path chaining -> /api/user/...

module.exports = router;
