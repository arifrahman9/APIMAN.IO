const express = require('express');
const RequestsController = require('../controllers/requests-controller');
const { upload } = require('../middlewares/multer');
const readRequestValidation = require('../middlewares/read-request-validation');
const router = express.Router();

router.get('/:id', RequestsController.getRequestById);

router.delete('/:id', RequestsController.deleteRequestById);

router.get('/', RequestsController.getRequestsByUserId);

router.post('/', RequestsController.requestApi);

router.post(
  '/read',
  upload.single('requests'),
  readRequestValidation,
  RequestsController.readRequests
);

module.exports = router;
