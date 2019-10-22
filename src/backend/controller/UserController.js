const UserRepository = require("../repositories/UserRepository");

const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => { // Path chaining -> /api/user/test
    try {
        await UserRepository.removeUser("testmail@test.de"); // Delete because email should be unique
        await UserRepository.createUser("testuser", "testmail@test.de", "123456", null);
        res.status(201).json();
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
