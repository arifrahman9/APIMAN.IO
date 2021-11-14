const redis = require('../config/redis');
const CollectionsModel = require('../models/collections-model');
const HistoriesModel = require('../models/histories-model');

class CollectionsController {
  static async getAllCollections(req, res, next) {
    try {
      let collections;

      const collectionsCache = await redis.get('collections');
      const collectionsUserIdCache = await redis.get('collectionsUserId');

      if (collectionsCache && collectionsUserIdCache == req.user.id) {
        collections = JSON.parse(collectionsCache);
      } else {
        collections = await CollectionsModel.getCollectionsByUserId(
          req.user.id
        );

        await redis.set('collections', JSON.stringify(collections));
        await redis.set('collectionsUserId', req.user.id);
      }

      res.status(200).json(collections);
    } catch (err) {
      next(err);
    }
  }

  static async addNewCollection(req, res, next) {
    try {
      const { name } = req.body;

      if (!name) {
        throw { name: 'collectionNameEmpty' };
      }

      await CollectionsModel.addNewCollection(req.user.id, name);

      const newCollection = await CollectionsModel.getLastInsertedCollection();

      await redis.del('collections');
      await redis.del('collectionsUserId');

      res.status(200).json(newCollection);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCollectionById(req, res, next) {
    try {
      const { id } = req.params;

      let foundCollection;
      const foundCollectionCache = await redis.get('foundCollection');
      const collectionIdCache = await redis.get('collectionId');

      if (foundCollectionCache && collectionIdCache == id) {
        foundCollection = JSON.parse(foundCollectionCache);
      } else {
        foundCollection = await CollectionsModel.getCollectionById(id);

        await redis.set('foundCollection', JSON.stringify(foundCollection));
        await redis.set('collectionId', id);
      }

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

      await redis.del('collections');
      await redis.del('collectionsUserId');

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

      await redis.del('collections');
      await redis.del('collectionsUserId');

      res.status(200).json(deletedCollection);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CollectionsController;
