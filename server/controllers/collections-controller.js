const CollectionsModel = require('../models/collections-model');
const HistoriesModel = require('../models/histories-model');

class CollectionsController {
  static async getAllCollections(req, res, next) {
    try {
      const collections = await CollectionsModel.getCollectionsByUserId(
        req.user.id
      );

      res.status(200).json(collections);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addNewCollection(req, res, next) {
    try {
      const { name } = req.body;
      await CollectionsModel.addNewCollection(req.user.id, name);

      const newCollection = await CollectionsModel.getLastInsertedCollection();

      res.status(200).json(newCollection);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCollectionById(req, res, next) {
    try {
      const { id } = req.params;

      const foundCollection = await CollectionsModel.getCollectionById(id);

      res.status(200).json(foundCollection);
    } catch (err) {
      next(err);
    }
  }

  static async updateCollectionName(req, res, next) {
    try {
      const { id, name } = req.body;

      const updatedCollection = await CollectionsModel.updateCollectionName(
        id,
        name
      );

      res.status(200).json(updatedCollection);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCollectionById(req, res, next) {
    try {
      const { id } = req.body;

      const deletedCollection = await CollectionsModel.deleteCollectionById(id);

      //remove CollectionId field from history
      await HistoriesModel.removeCollectionId(id);

      res.status(200).json(deletedCollection);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CollectionsController;
