const JWTService = require('../services/JWTService');
const PushRepository = require('../repositories/PushRepository');

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {userId, subscription} = req.body;

    await PushRepository.saveSubscription(userId, subscription);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const userId = req.query.id;
    const removal = await PushRepository.deleteSubscription(userId);
    if (!removal) {
      res.status(404).json({message: `Deletion of subscription of user ${userId} unsuccessful`});
    }
    res.json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;