const request = require('supertest');
const app = require('../app');
const redis = require('../config/redis');
const mongodb = require('mongodb');
const { connect, getDatabase } = require('../config/mongo');

let newestHistory;
let lastInsertedUser;
let lastInsertedCollection;
let loginResponse;
let db;

const deleteRedis = async () => {
  await redis.del('histories');
  await redis.del('historiesUserId');
};

const deleteRedisHistoriesCollection = async () => {
  await redis.get('collectionHistories');
  await redis.get('historiesCollectionId');
};

const deleteRedisFoundHistory = async () => {
  await redis.get('foundHistory');
  await redis.get('historyId');
};

const setToRedis = async (historyData, userData) => {
  await redis.set('histories', JSON.stringify(historyData));
  await redis.set('historiesUserId', mongodb.ObjectId(userData));
};

const setToRedisHistoriesCollection = async (
  historiesCollectionData,
  collectionIdData
) => {
  await redis.set(
    'collectionHistories',
    JSON.stringify(historiesCollectionData)
  );
  await redis.set('historiesCollectionId', mongodb.ObjectId(collectionIdData));
};

const setRedisFoundHistory = async (history, historyID) => {
  await redis.set('foundHistory', JSON.stringify(history));
  await redis.set('historyId', mongodb.ObjectId(historyID));
};

const addHistory = async () => {
  db = getDatabase();
  const historiesCollection = db.collection('histories');

  await historiesCollection.insertOne({
    method: 'GET',
    url: 'https://testurl.com',
    headers: null,
    params: null,
    bodies: { email: 'email2@gmail.com', password: 'password' },
    UserId: lastInsertedUser[0]._id,
  });
};

describe('GET /histories', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const historiesCollection = db.collection('histories');

    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfully fetched histories that belong to the user', (done) => {
    deleteRedis();

    request(app)
      .get('/histories')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        console.log(body);

        expect(body).toEqual(expect.any(Array));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success from cache] successfully fetched histories that belong to the user from redis cache', (done) => {
    setToRedis(newestHistory, lastInsertedUser[0]._id);

    console.log(lastInsertedUser[0]._id, '<===');

    request(app)
      .get('/histories')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        console.log(body);

        expect(body).toEqual(expect.any(Array));

        deleteRedis();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch histories because of invalid token', (done) => {
    request(app)
      .get('/histories')
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
});

describe('POST /histories', () => {
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
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const historiesCollection = db.collection('histories');

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    console.log(newestHistory, '<== newest');

    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfully added new history', (done) => {
    deleteRedis();

    request(app)
      .post('/histories')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: 'http://localhost:4000/register',
        params: null,
        headers: {
          access_token: '12345',
        },
        bodies: null,
        method: 'POST',
      })
      .then((response) => {
        const body = response.body;

        expect(body[0]).toEqual(expect.any(Object));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('method');
        expect(body[0]).toHaveProperty('url');
        expect(body[0]).toHaveProperty('headers');
        expect(body[0]).toHaveProperty('params');
        expect(body[0]).toHaveProperty('bodies');
        expect(body[0]).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed too add new history because of empty body params', (done) => {
    deleteRedis();

    request(app)
      .post('/histories')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: null,
        params: null,
        headers: {
          access_token: '12345',
        },
        bodies: null,
        method: 'POST',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'url or method cannot be empty');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /histories/collections/:collectionId', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'history test collection',
      UserId: lastInsertedUser[0]._id,
    });

    lastInsertedCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
      CollectionId: lastInsertedCollection[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    console.log(newestHistory);
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();

    const historiesCollection = db.collection('histories');
    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });

    const collectionsCollection = db.collection('collections');
    await collectionsCollection.deleteOne({
      _id: lastInsertedCollection[0]._id,
    });
  });

  test('[success] successfuly fetched history by collection id', (done) => {
    deleteRedisHistoriesCollection();

    request(app)
      .get(`/histories/collection/${lastInsertedCollection[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body[0]).toEqual(expect.any(Object));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('method');
        expect(body[0]).toHaveProperty('url');
        expect(body[0]).toHaveProperty('headers');
        expect(body[0]).toHaveProperty('params');
        expect(body[0]).toHaveProperty('bodies');
        expect(body[0]).toHaveProperty('UserId');
        expect(body[0]).toHaveProperty('CollectionId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success from cache] successfuly fetched history by collection id from redis cache', (done) => {
    setToRedisHistoriesCollection(newestHistory, lastInsertedCollection[0]._id);

    request(app)
      .get(`/histories/collection/${lastInsertedCollection[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body[0]).toEqual(expect.any(Object));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('method');
        expect(body[0]).toHaveProperty('url');
        expect(body[0]).toHaveProperty('headers');
        expect(body[0]).toHaveProperty('params');
        expect(body[0]).toHaveProperty('bodies');
        expect(body[0]).toHaveProperty('UserId');
        expect(body[0]).toHaveProperty('CollectionId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch history by collection id because of invalid token', (done) => {
    request(app)
      .get(`/histories/collection/${lastInsertedCollection[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Invalid access token');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch histories by collection id because collection does not exist', (done) => {
    request(app)
      .get('/histories/collection/618f6d283cdf446fd20beeee')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;
        console.log(body, '<===== body');

        expect(body).toEqual(expect.any(Object));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /histories/collection', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'history test collection',
      UserId: lastInsertedUser[0]._id,
    });

    lastInsertedCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
      // CollectionId: lastInsertedCollection[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();

    const historiesCollection = db.collection('histories');
    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });

    const collectionsCollection = db.collection('collections');
    await collectionsCollection.deleteOne({
      _id: lastInsertedCollection[0]._id,
    });
  });

  test('[success] successfuly added history to collection', (done) => {
    request(app)
      .post(`/histories/collection`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        historyId: newestHistory[0]._id,
        collectionId: lastInsertedCollection[0]._id,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('headers');
        expect(body).toHaveProperty('params');
        expect(body).toHaveProperty('bodies');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to add history to collection', (done) => {
    request(app)
      .post(`/histories/collection`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        id: '12345',
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

describe('POST /histories/collection-remove/:id', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'history test collection',
      UserId: lastInsertedUser[0]._id,
    });

    lastInsertedCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
      CollectionId: lastInsertedCollection[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();

    const historiesCollection = db.collection('histories');
    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });

    const collectionsCollection = db.collection('collections');
    await collectionsCollection.deleteOne({
      _id: lastInsertedCollection[0]._id,
    });
  });

  test('[success] successfuly removed history from collection', (done) => {
    request(app)
      .post(`/histories/collection-remove/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('headers');
        expect(body).toHaveProperty('params');
        expect(body).toHaveProperty('bodies');
        expect(body).toHaveProperty('UserId');
        expect(body).toHaveProperty('CollectionId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to remove history from collection because of invalid token', (done) => {
    request(app)
      .post(`/histories/collection-remove/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Invalid access token');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to remove history from collection because the history does not exist', (done) => {
    request(app)
      .post('/histories/collection-remove/618f6d283cdf446fd20beeee')
      .set({
        access_token: loginResponse.body.access_token,
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

describe('GET /histories/:id', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'history test collection',
      UserId: lastInsertedUser[0]._id,
    });

    lastInsertedCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
      // CollectionId: lastInsertedCollection[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();

    const historiesCollection = db.collection('histories');
    await historiesCollection.deleteOne({
      _id: newestHistory[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });

    const collectionsCollection = db.collection('collections');
    await collectionsCollection.deleteOne({
      _id: lastInsertedCollection[0]._id,
    });
  });

  test('[success] successfuly fetched history by ID', (done) => {
    deleteRedisFoundHistory();

    request(app)
      .get(`/histories/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('headers');
        expect(body).toHaveProperty('params');
        expect(body).toHaveProperty('bodies');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success from cache] successfuly fetched history by ID from redis cache', (done) => {
    setRedisFoundHistory(newestHistory[0], newestHistory[0]._id);

    request(app)
      .get(`/histories/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('headers');
        expect(body).toHaveProperty('params');
        expect(body).toHaveProperty('bodies');
        expect(body).toHaveProperty('UserId');

        deleteRedisFoundHistory();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch history by ID because of invalid token', (done) => {
    request(app)
      .get(`/histories/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Invalid access token');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch history by ID because history does not exist', (done) => {
    request(app)
      .get(`/histories/618f6d283cdf446fd20beeee`)
      .set({
        access_token: loginResponse.body.access_token,
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

describe('DELETE /histories/:id', () => {
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

    db = getDatabase();
    const historiesCollection = db.collection('histories');
    const collectionsCollection = db.collection('collections');

    await collectionsCollection.insertOne({
      name: 'history test collection',
      UserId: lastInsertedUser[0]._id,
    });

    lastInsertedCollection = await collectionsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    await historiesCollection.insertOne({
      method: 'GET',
      url: 'https://testurl.com',
      headers: null,
      params: null,
      bodies: { email: 'email2@gmail.com', password: 'password' },
      UserId: lastInsertedUser[0]._id,
      // CollectionId: lastInsertedCollection[0]._id,
    });

    newestHistory = await historiesCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });

    const collectionsCollection = db.collection('collections');
    await collectionsCollection.deleteOne({
      _id: lastInsertedCollection[0]._id,
    });
  });

  test('[success] successfuly deleted history by ID', (done) => {
    request(app)
      .delete(`/histories/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('headers');
        expect(body).toHaveProperty('params');
        expect(body).toHaveProperty('bodies');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to delete history by ID because of invalid token', (done) => {
    request(app)
      .delete(`/histories/${newestHistory[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Invalid access token');

        const historiesCollection = db.collection('histories');
        historiesCollection.deleteOne({
          _id: newestHistory[0]._id,
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to delete history by ID because history does not exist', (done) => {
    request(app)
      .delete('/histories/618f6d283cdf446fd20beeee')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Internal Server Error');

        const historiesCollection = db.collection('histories');
        historiesCollection.deleteOne({
          _id: newestHistory[0]._id,
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
