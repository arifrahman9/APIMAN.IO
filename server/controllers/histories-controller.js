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
}

module.exports = HistoriesController;
