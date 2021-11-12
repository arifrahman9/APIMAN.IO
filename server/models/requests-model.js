const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class RequestsModel {
  static async addNewRequest(payload, UserId) {
    try {
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

  static async getRequestsByUserId(UserId) {
    try {
      const db = getDatabase();
      const requestsCollection = db.collection('requests');

      const requests = await requestsCollection
        .find({
          UserId,
        })
        .toArray();

      return requests;
    } catch (err) {
      return err;
    }
  }

  static async getRequestById(id) {
    try {
      const db = getDatabase();
      const requestsCollection = db.collection('requests');

      const request = await requestsCollection.findOne({
        _id: mongodb.ObjectId(id),
      });

      return request;
    } catch (err) {
      return err;
    }
  }

  static async deleteRequestById(id) {
    try {
      const db = getDatabase();
      const requestsCollection = db.collection('requests');

      const deletedRequest = await requestsCollection.findOne({
        _id: mongodb.ObjectId(id),
      });

      await requestsCollection.deleteOne({
        _id: mongodb.ObjectId(id),
      });

      return deletedRequest;
    } catch (err) {
      return err;
    }
  }
}

module.exports = RequestsModel;
