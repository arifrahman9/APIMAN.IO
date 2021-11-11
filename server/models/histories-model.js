const mongodb = require('mongodb');
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

  static async getHistoriesByCollectionId(collectionId) {
    try {
      const db = getDatabase();
      const historiesCollection = db.collection('histories');

      const histories = await historiesCollection
        .find({
          CollectionId: mongodb.ObjectId(collectionId),
        })
        .toArray();

      return histories;
    } catch (err) {
      return err;
    }
  }

  static async addNewHistory(url, params, headers, bodies, method, userId) {
    try {
      const db = getDatabase();
      const historiesCollection = db.collection('histories');
      await historiesCollection.insertOne({
        method,
        url,
        headers,
        params,
        bodies,
        UserId: userId,
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

  static async getHistoryById(id) {
    try {
      const db = getDatabase();
      const historiesCollection = db.collection('histories');
      const history = await historiesCollection.findOne({
        _id: mongodb.ObjectId(id),
      });

      return history;
    } catch (err) {
      return err;
    }
  }

  static async addHistoryToCollection(historyId, collectionId) {
    try {
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
    } catch (err) {
      return err;
    }
  }

  static async deleteHistoryById(id) {
    try {
      const db = getDatabase();
      const historiesCollection = db.collection('histories');

      const historyToDelete = await historiesCollection.findOne({
        _id: mongodb.ObjectId(id),
      });

      await historiesCollection.deleteOne({
        _id: mongodb.ObjectId(id),
      });

      return historyToDelete;
    } catch (err) {
      return err;
    }
  }

  // ini method kalo hapus collection, field CollectionId di history juga dihilangkan
  static async removeCollectionId(collectionId) {
    try {
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
    } catch (err) {
      return err;
    }
  }
}

module.exports = HistoriesModel;
