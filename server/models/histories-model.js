const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class HistoriesModel {
  static async getAllHistoriesByUserId(userId) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');
    const histories = await historiesCollection
      .find({
        UserId: userId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return histories;
  }

  static async getHistoriesByCollectionId(collectionId) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');

    const histories = await historiesCollection
      .find({
        CollectionId: mongodb.ObjectId(collectionId),
      })
      .toArray();

    return histories;
  }

  static async addNewHistory(url, params, headers, bodies, method, userId) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');
    await historiesCollection.insertOne({
      method,
      url,
      headers,
      params,
      bodies,
      UserId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return newHistory;
  }

  static async getHistoryById(id) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');
    const history = await historiesCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    return history;
  }

  static async addHistoryToCollection(historyId, collectionId) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');

    const historyToAdd = await historiesCollection.findOne({
      _id: mongodb.ObjectId(historyId),
    });

    await historiesCollection.updateOne(
      {
        _id: mongodb.ObjectId(historyId),
      },
      {
        $set: {
          CollectionId: mongodb.ObjectId(collectionId),
        },
      }
    );

    return historyToAdd;
  }

  static async deleteHistoryById(id) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');

    const historyToDelete = await historiesCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    await historiesCollection.deleteOne({
      _id: mongodb.ObjectId(id),
    });

    return historyToDelete;
  }

  // ini method kalo hapus collection, field CollectionId di history juga dihilangkan
  static async removeCollectionId(collectionId) {
    const db = getDatabase();
    const historiesCollection = db.collection('histories');

    await historiesCollection.updateMany(
      {
        CollectionId: mongodb.ObjectId(collectionId),
      },
      {
        $unset: {
          CollectionId: 1,
        },
      },
      {
        multi: true,
      }
    );
  }
}

module.exports = HistoriesModel;
