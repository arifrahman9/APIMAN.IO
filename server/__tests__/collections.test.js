const request = require('supertest');
const app = require('../app');
const mongodb = require('mongodb');
const redis = require('../config/redis');
const { connect, getDatabase } = require('../config/mongo');

let newestCollection;
let lastInsertedUser;
let loginResponse;
let db;

const deleteRedis = async () => {
  await redis.del('collections');
  await redis.del('collectionsUserId');
};

const deleteRedisFoundCollection = async () => {
  await redis.get('foundCollection');
  await redis.get('collectionId');
};

const setToRedis = async (collectionsData, userData) => {
  await redis.set('collections', JSON.stringify(collectionsData));
  await redis.set('collectionsUserId', mongodb.ObjectId(userData));
};

const setRedisFoundCollection = async (collection, collectionID) => {
  await redis.set('foundCollection', JSON.stringify(collection));
  await redis.set('collectionId', mongodb.ObjectId(collectionID));
};

describe('GET /collections', () => {
  beforeAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const usersCollection = db.collection('users');

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
    deleteRedis();

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

  test('[success] successfuly fetched collections that belongs to the user', (done) => {
    setToRedis(newestCollection, lastInsertedUser[0]._id);

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

        deleteRedis();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch collections', (done) => {
    request(app)
      .get('/collections')
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success] successfuly fetched collection by id', (done) => {
    deleteRedis();

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

  test('[success] successfuly fetched collection by id', (done) => {
    setRedisFoundCollection(newestCollection[0], newestCollection[0]._id);

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

        deleteRedis();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch collection by id because of invalid token', (done) => {
    request(app)
      .get(`/collections/${newestCollection[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch collection by id because of empty id', (done) => {
    request(app)
      .get(`/collections/${null}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('PATCH /collections', () => {
  beforeAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const usersCollection = db.collection('users');

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

  test('[success] change collection name successfull', (done) => {
    request(app)
      .patch('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: newestCollection[0]._id,
        name: 'new name',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('name', 'new name');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] change collection name failed', (done) => {
    request(app)
      .patch('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: '',
        name: 'new name',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Internal Server Error');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('DELETE /collections', () => {
  beforeAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const usersCollection = db.collection('users');

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

    // await collectionsCollection.deleteOne({
    //   _id: newestCollection[0]._id,
    // });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] delete collection successfull', (done) => {
    request(app)
      .delete('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: newestCollection[0]._id,
        name: 'new name',
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

  test('[failed] delete collection failed', (done) => {
    request(app)
      .patch('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: '',
      })
      .then((response) => {
        const body = response.body;

        console.log(body);

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Internal Server Error');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] delete collection failed because of empty id', (done) => {
    request(app)
      .patch('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: '',
      })
      .then((response) => {
        const body = response.body;

        console.log(body);

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /collections', () => {
  beforeAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const usersCollection = db.collection('users');

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

  test('[success] add new collection successful', (done) => {
    request(app)
      .post('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        name: 'newest collection',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Array));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0]).toHaveProperty('UserId');

        db = getDatabase();
        const collectionsCollection = db.collection('collections');

        collectionsCollection.deleteOne({
          _id: mongodb.ObjectId(body[0]._id),
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] add new collection failed', (done) => {
    request(app)
      .post('/collections')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({})
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty(
          'message',
          'collection name cannot be empty'
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
