const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class ResultsModel {
  static async getResultsByUserId(UserId) {
    const db = getDatabase();
    const resultsCollection = db.collection('results');
    const results = await resultsCollection.find({ UserId: UserId }).toArray();
    return results;
  }

  static async addNewResult(
    content,
    status,
    code,
    responseTime,
    responseSize,
    UserId
  ) {
    const db = getDatabase();
    const resultsCollection = db.collection('results');
    const result = await resultsCollection.insertOne({
      content,
      status,
      code,
      responseTime,
      responseSize,
      UserId,
    });
    return result;
  }

  static async getResultsById(id) {
    const db = getDatabase();
    const resultsCollection = db.collection('results');
    const result = await resultsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });
    return result;
  }

  static async deleteResultById(id) {
    const db = getDatabase();
    const resultsCollection = db.collection('results');
    const resultToDelete = await resultsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });
    await resultsCollection.deleteOne({
      _id: mongodb.ObjectId(id),
    });
    return resultToDelete;
  }

  static async getLastInsertedResult() {
    const db = getDatabase();
    const resultsCollection = db.collection('results');
    const result = await resultsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return result;
  }
}

module.exports = ResultsModel;
