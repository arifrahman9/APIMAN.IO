const express = require('express');
const HistoriesController = require('../controllers/histories-controller');
const router = express.Router();

router.get('/:id', HistoriesController.getHistoryById);

router.delete('/:id', HistoriesController.deleteHistoryById);

router.post(
  '/collection-remove/:id',
  HistoriesController.removeHistoryFromCollection
);

router.get(
  '/collection/:collectionId',
  HistoriesController.getHistoriesByCollectionId
);

router.post('/collection', HistoriesController.addHistoryToCollection);

router.post('/', HistoriesController.addNewHistory);

router.get('/', HistoriesController.getAllHistoriesByUserId);

module.exports = router;
