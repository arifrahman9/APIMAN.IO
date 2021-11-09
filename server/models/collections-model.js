const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');

class CollectionsModel {
  static async getCollectionsByUserId(userId) {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');
    const collections = await collectionsCollection
      .find({
        UserId: userId,
      })
      .toArray();

    return collections;
  }

  static async addNewCollection(UserId, HistoryId, name) {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');
    const collection = await collectionsCollection.insertOne({
      name,
      HistoryId,
      UserId,
    });

    return collection;
  }

  static async getCollectionById(id) {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');
    const collection = await collectionsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    return collection;
  }

  static async updateCollectionName(id, name) {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');
    await collectionsCollection.updateOne(
      {
        _id: mongodb.ObjectId(id),
      },
      {
        $set: {
          name,
        },
      }
    );

    const updatedCollection = await collectionsCollection.findOne({
      _id: id,
    });

    return updatedCollection;
  }

  static async deleteCollectionById(id) {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');

    const collectionToDelete = await collectionsCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    await collectionsCollection.deleteOne({
      _id: mongodb.ObjectId(id),
    });

    return collectionToDelete;
  }

  static async getLastInsertedCollection() {
    const db = getDatabase();
    const collectionsCollection = db.collection('collections');
    const collection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return collection;
  }
}

module.exports = CollectionsModel;
