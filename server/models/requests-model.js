const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class RequestsModel {
  static async addNewRequest(payload, UserId) {
    const db = getDatabase();
    const requestsCollection = db.collection('requests');

    payload.forEach((el) => {
      el['UserId'] = UserId;
    });

    await requestsCollection.insertMany(payload);

    return payload;
  }

  static async getRequestsByUserId(UserId) {
    const db = getDatabase();
    const requestsCollection = db.collection('requests');

    const requests = await requestsCollection
      .find({
        UserId,
      })
      .toArray();

    return requests;
  }

  static async getRequestById(id) {
    const db = getDatabase();
    const requestsCollection = db.collection('requests');

    const request = await requestsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    return request;
  }

  static async deleteRequestById(id) {
    const db = getDatabase();
    const requestsCollection = db.collection('requests');

    const deletedRequest = await requestsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    await requestsCollection.deleteOne({
      _id: mongodb.ObjectId(id),
    });

    return deletedRequest;
  }
}

module.exports = RequestsModel;
