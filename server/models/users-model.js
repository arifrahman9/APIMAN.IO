const mongodb = require('mongodb');
const { getDatabase } = require('../config/mongo');
// const { getDatabase } = require('../config/mongo-test');
const { hashPassword } = require('../helpers/bcrypt');
const crypto = require('crypto');
const { createToken } = require('../helpers/jwt');

class UsersModel {
  static async register(reqBody) {
    const { username, email, password, firstName, lastName } = reqBody;
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.insertOne({
      username,
      email,
      password: hashPassword(password),
      firstName,
      lastName,
    });

    return user;
  }

  static async login(reqBody) {
    const { email } = reqBody;
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const response = await usersCollection.findOne({
      $or: [{ email }, { username: email }],
    });

    return response;
  }

  static async getLoggedInUser(id) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const foundUser = await usersCollection.findOne({
      _id: mongodb.ObjectId(id),
    });

    return foundUser;
  }

  static async findUserByUsername(username) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const response = await usersCollection.findOne({
      username,
    });

    return response;
  }

  static async findUserByEmail(email) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const response = await usersCollection.findOne({
      email,
    });

    return response;
  }

  static async getLastInsertedUser() {
    const db = getDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    return user;
  }

  static async loginGoogle(payload) {
    const emailFromGoogle = payload.email;
    const nameFromGoogle = payload.name;

    const db = getDatabase();
    const usersCollection = db.collection('users');

    const foundUser = await usersCollection.findOne({ email: emailFromGoogle });

    let user;
    if (!foundUser) {
      await usersCollection.insertOne({
        username: nameFromGoogle,
        email: emailFromGoogle,
        password: hashPassword(Math.random().toString(36).slice(-8)),
        firstName: nameFromGoogle.split(' ')[0],
      });

      user = this.getLastInsertedUser();
    } else {
      user = [foundUser];
    }

    return user;
  }

  static async setResetPasswordToken(user) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const token = await new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          reject('error generating token');
        }

        resolve(buf.toString('hex'));
      });
    });

    await usersCollection.updateOne(
      {
        _id: mongodb.ObjectId(user._id),
      },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 300000,
        },
      }
    );

    return token;
  }

  static async findUserByToken(token) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    return user;
  }

  static async changeUserPassword(user, newPassword) {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    await usersCollection.updateOne(
      {
        _id: mongodb.ObjectId(user._id),
      },
      {
        $set: {
          password: hashPassword(newPassword),
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
      }
    );

    return;
  }
}

module.exports = UsersModel;
