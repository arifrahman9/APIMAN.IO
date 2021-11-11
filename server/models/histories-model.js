const { getDatabase } = require('../config/mongo');

class HistoriesModel {
  static async getAllHistoriesByUserId(userId) {
    try {
      const db = getDatabase();
      const historiesCollection = db.collection('histories');
      const histories = await historiesCollection
        .find({
          UserId: userId,
        })
        .toArray();

      return histories;
    } catch (err) {
      return err;
    }
  }

  static async addNewHistory(requestBody, userId) {
    try {
      const { url, params, headers, bodies, method } = requestBody;

      const db = getDatabase();
      const historiesCollection = db.collection('histories');
      await historiesCollection.insertOne({
        method,
        url,
        headers,
        params,
        bodies,
        userId,
      });

      const newHistory = await historiesCollection
        .find({})
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      return newHistory;
    } catch (err) {
      return err;
    }
  }
}

module.exports = HistoriesModel;
