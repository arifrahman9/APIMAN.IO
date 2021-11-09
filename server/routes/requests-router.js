const express = require('express');
const RequestsController = require('../controllers/requests-controller');
const router = express.Router();

router.post('/', RequestsController.requestApi);

module.exports = router;
