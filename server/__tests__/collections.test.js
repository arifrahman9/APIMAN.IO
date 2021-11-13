const request = require('supertest');
const app = require('../app');
const mongodb = require('mongodb');
const { hashPassword } = require('../helpers/bcrypt');
const { connect, getDatabase } = require('../config/mongo');

let newestCollection;
let lastInsertedUser;
let loginResponse;
let db;

describe('GET /collections', () => {
  beforeAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const usersCollection = db.collection('users');

    // await usersCollection.insertOne({
    //   username: 'testuser',
    //   email: 'test@gmail.com',
    //   password: hashPassword('password'),
    //   firstName: 'firstTest',
    //   lastName: 'lastTest',
    // });

    await request(app).post('/register').send({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
      firstName: 'firstTest',
      lastName: 'lastTest',
    });

    lastInsertedUser = await usersCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    console.log(lastInsertedUser);

    // then login
    const payload = {
      email: 'test@gmail.com',
      password: 'password',
    };

    loginResponse = await request(app).post('/login').send(payload);

    console.log(loginResponse.body.access_token);

    db = getDatabase();
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'new test collection',
      UserId: lastInsertedUser[0]._id,
    });

    newestCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    console.log(newestCollection);
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.deleteOne({
      _id: newestCollection[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly fetched collections that belongs to the user', (done) => {
    console.log(loginResponse.body.access_token, '<=====');
    request(app)
      .get('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Array));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0]).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success] successfuly fetched collection by id', (done) => {
    request(app)
      .get(`/collections/${newestCollection[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
