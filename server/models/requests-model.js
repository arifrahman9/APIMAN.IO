const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class RequestsModel {
  static async addNewRequest(payload, UserId) {
    try {
      const { method, url } = payload;

      const db = getDatabase();
      const requestsCollection = db.collection('requests');

      payload.forEach((el) => {
        el['UserId'] = UserId;
      });

      await requestsCollection.insertMany(payload);

      return payload;
    } catch (err) {
      return err;
    }
  }
}

module.exports = RequestsModel;
