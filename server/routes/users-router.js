const express = require('express');
const UsersController = require('../controllers/users-controller');
const router = express.Router();

router.get('/profile', UsersController.getUserCredentials);

//tes
module.exports = router;
