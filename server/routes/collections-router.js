const express = require('express');
const CollectionsController = require('../controllers/collections-controller');
const router = express.Router();

router.get('/', CollectionsController.getAllCollections);

router.post('/', CollectionsController.addNewCollection);

router.patch('/', CollectionsController.updateCollectionName);

router.delete('/', CollectionsController.deleteCollectionById);

router.get('/:id', CollectionsController.getCollectionById);

module.exports = router;
