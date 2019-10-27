const UserRepository = require("../repositories/UserRepository");

const express = require('express');
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

module.exports = router;
