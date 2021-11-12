const express = require('express');
const RequestsController = require('../controllers/requests-controller');
const { upload } = require('../middlewares/multer');
const readJsonFile = require('../middlewares/readJson');
const router = express.Router();

router.post(
  '/read',
  upload.single('requests'),
  RequestsController.readRequests
);

router.post('/', RequestsController.requestApi);

module.exports = router;
