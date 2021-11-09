const express = require('express');
const router = express.Router();

const errorHandler = require('../middlewares/error-handler');
const authentication = require('../middlewares/authentication');

const requests = require('./requests-router');
const UsersController = require('../controllers/users-controller');

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

router.use('/requests', requests);

router.use(errorHandler);

module.exports = router;
