const JWTService = require('../services/JWTService');
const PushRepository = require('../repositories/PushRepository');

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {userId, subscription, deviceFingerprint} = req.body;

    await PushRepository.saveSubscription(userId, subscription, deviceFingerprint);

    res.status(201).json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const userId = req.query.id;
    const deviceFingerprint = req.query.deviceFingerprint;

    const removal = await PushRepository.deleteSubscription(userId, deviceFingerprint);
    if (!removal) {
      res.status(404).json({message: `Deletion of subscription of user ${userId} unsuccessful`});
    }
    res.json();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {userId, deviceFingerprint} = req.query;
    const subscription = await PushRepository.isSubscribed(userId, deviceFingerprint);

    res.json({subscription});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;