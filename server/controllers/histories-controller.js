const HistoriesModel = require('../models/histories-model');

class HistoriesController {
  static async getAllHistoriesByUserId(req, res, next) {
    try {
      const histories = await HistoriesModel.getAllHistoriesByUserId(
        req.user.id
      );

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }

  static async getHistoriesByCollectionId(req, res, next) {
    try {
      const { collectionId } = req.params;

      const histories = await HistoriesModel.getHistoriesByCollectionId(
        collectionId
      );

      if (histories.length === 0) {
        throw new Error();
      }

      res.status(200).json(histories);
    } catch (err) {
      next(err);
    }
  }

  static async getHistoryById(req, res, next) {
    try {
      const { id } = req.params;

      const foundHistory = await HistoriesModel.getHistoryById(id);

      if (!foundHistory) {
        throw new Error();
      }

      res.status(200).json(foundHistory);
    } catch (err) {
      next(err);
    }
  }

  static async addHistoryToCollection(req, res, next) {
    try {
      const { historyId, collectionId } = req.body;

      if (!historyId || !collectionId) {
        throw new Error();
      }

      const addedHistory = await HistoriesModel.addHistoryToCollection(
        historyId,
        collectionId
      );

      res.status(200).json(addedHistory);
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

      res.status(200).json(deletedHistory);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HistoriesController;
