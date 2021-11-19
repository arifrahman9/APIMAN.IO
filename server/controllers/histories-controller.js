const HistoriesModel = require('../models/histories-model');
const redis = require('../config/redis');

class HistoriesController {
  static async getAllHistoriesByUserId(req, res, next) {
    try {
      let histories;
      const historiesCache = await redis.get('histories');
      const historiesUserIdCache = await redis.get('historiesUserId');

      if (historiesCache && historiesUserIdCache == req.user.id) {
        histories = JSON.parse(historiesCache);
      } else {
        histories = await HistoriesModel.getAllHistoriesByUserId(req.user.id);

        await redis.set('histories', JSON.stringify(histories));
        await redis.set('historiesUserId', req.user.id);
      }

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }

  static async addNewHistory(req, res, next) {
    try {
      const { url, params, headers, bodies, method } = req.body;

      if (!url || !method) {
        throw { name: 'historyFieldEmpty' };
      }

      const newHistory = await HistoriesModel.addNewHistory(
        url,
        params,
        headers,
        bodies,
        method,
        req.user.id
      );

      await redis.del('histories');
      await redis.del('historiesUserId');

      res.status(200).json(newHistory);
    } catch (err) {
      next(err);
    }
  }

  static async getHistoriesByCollectionId(req, res, next) {
    try {
      const { collectionId } = req.params;

      let histories;
      const collectionHistoriesCache = await redis.get('collectionHistories');
      const historiesCollectionIdCache = await redis.get(
        'historiesCollectionId'
      );

      if (
        collectionHistoriesCache &&
        historiesCollectionIdCache == collectionId
      ) {
        histories = JSON.parse(collectionHistoriesCache);
      } else {
        histories = await HistoriesModel.getHistoriesByCollectionId(
          collectionId
        );

        if (histories.length === 0) {
          throw new Error();
        }

        await redis.set('collectionHistories', JSON.stringify(histories));
        await redis.set('historiesCollectionId', collectionId);
      }

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }

  static async getHistoryById(req, res, next) {
    try {
      const { id } = req.params;

      let foundHistory;
      const foundHistoryCache = await redis.get('foundHistory');
      const historyIdCache = await redis.get('historyId');

      if (foundHistoryCache && historyIdCache === id) {
        foundHistory = JSON.parse(foundHistoryCache);
      } else {
        foundHistory = await HistoriesModel.getHistoryById(id);

        if (!foundHistory) {
          throw new Error();
        }

        await redis.set('foundHistory', JSON.stringify(foundHistory));
        await redis.set('historyId', id);
      }

      res.status(200).json(foundHistory);
    } catch (err) {
      next(err);
    }
  }

  static async addHistoryToCollection(req, res, next) {
    try {
      const { historyId, collectionId } = req.body;
      const historiesCache = await redis.get('histories');

      if (!historyId || !collectionId) {
        throw new Error();
      }

      const addedHistory = await HistoriesModel.addHistoryToCollection(
        historyId,
        collectionId
      );

      await redis.del('histories');
      await redis.del('historiesUserId');

      res.status(200).json(addedHistory);
    } catch (err) {
      next(err);
    }
  }

  static async removeHistoryFromCollection(req, res, next) {
    try {
      const { id } = req.params;

      const removedHistory = await HistoriesModel.getHistoryById(id);

      if (!removedHistory) {
        throw new Error();
      }

      await HistoriesModel.removeCollectionIdByHistoryId(id);

      await redis.del('histories');
      await redis.del('historiesUserId');

      res.status(200).json(removedHistory);
    } catch (err) {
      next(err);
    }
  }

  static async deleteHistoryById(req, res, next) {
    try {
      const { id } = req.params;

      const deletedHistory = await HistoriesModel.deleteHistoryById(id);

      if (!deletedHistory) {
        throw new Error();
      }

      await redis.del('histories');
      await redis.del('historiesUserId');

      res.status(200).json(deletedHistory);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HistoriesController;
