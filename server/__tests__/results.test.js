const request = require('supertest');
const app = require('../app');
const mongodb = require('mongodb');
const { connect, getDatabase } = require('../config/mongo');

let newestResults;
let lastInsertedUser;
let loginResponse;
let db;

describe('GET /results', () => {
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

    const payload = {
      email: 'test@gmail.com',
      password: 'password',
    };

    loginResponse = await request(app).post('/login').send(payload);

    db = getDatabase();
    const resultsCollection = db.collection('results');
    await resultsCollection.insertOne({
      content: 'new test content',
      status: 200,
      code: 'new test code',
      responseTime: 15,
      responseSize: 100,
      UserId: lastInsertedUser[0]._id,
    });

    newestResults = await resultsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const resultsCollection = db.collection('results');

    await resultsCollection.deleteOne({
      _id: newestResults[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[Success] successfully fetched results', (done) => {
    request(app)
      .get('/results')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        // console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('content');
        expect(response.body[0]).toHaveProperty('status');
        expect(response.body[0]).toHaveProperty('code');
        expect(response.body[0]).toHaveProperty('responseTime');
        expect(response.body[0]).toHaveProperty('responseSize');
        expect(response.body[0]).toHaveProperty('UserId');
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] failed to fetch results because invalid token', (done) => {
    request(app)
      .get('/results')
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty('message', 'Invalid access token');
        done();
      })
      .catch((err) => done(err));
  });

  test('[Success] successfully fetch results by id', (done) => {
    request(app)
      .get(`/results/${newestResults[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('responseTime');
        expect(response.body).toHaveProperty('responseSize');
        expect(response.body).toHaveProperty('UserId');
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] failed fetch results by id because result does not exist', (done) => {
    request(app)
      .get('/results/618f6d283cdf446fd20beeee')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        console.log(response.body, '=======>>>>>>>>>>>>>>');
        expect(response.status).toBe(500);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty(
          'message',
          'Internal Server Error'
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /results', () => {
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

    const payload = {
      email: 'test@gmail.com',
      password: 'password',
    };

    loginResponse = await request(app).post('/login').send(payload);

    db = getDatabase();
    const resultsCollection = db.collection('results');
    await resultsCollection.insertOne({
      content: 'new test content',
      status: 200,
      code: 'new test code',
      responseTime: 15,
      responseSize: 100,
      UserId: lastInsertedUser[0]._id,
    });

    newestResults = await resultsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const resultsCollection = db.collection('results');

    await resultsCollection.deleteOne({
      _id: newestResults[0]._id,
    });

    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[Success] add new result successful', (done) => {
    request(app)
      .post('/results')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        content: 'new test content',
        status: 200,
        code: 'new test code',
        responseTime: 15,
        responseSize: '100',
      })
      .then((response) => {
        // console.log(response, "===>>>>>")
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('content');
        expect(response.body[0]).toHaveProperty('status');
        expect(response.body[0]).toHaveProperty('code');
        expect(response.body[0]).toHaveProperty('responseTime');
        expect(response.body[0]).toHaveProperty('responseSize');
        expect(response.body[0]).toHaveProperty('UserId');
        db = getDatabase();
        const resultsCollection = db.collection('results');

        resultsCollection.deleteOne({
          _id: mongodb.ObjectId(response.body[0]._id),
        });
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] add new results failed because field empty', (done) => {
    request(app)
      .post('/results')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({})
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
          'message',
          'Result field cannot be empty'
        );
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] add new results failed because invalid token', (done) => {
    request(app)
      .post('/results')
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .send({
        content: 'new test content',
        status: 200,
        code: 'new test code',
        responseTime: 15,
        responseSize: '100',
      })
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid access token');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('DELETE /results', () => {
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

    const payload = {
      email: 'test@gmail.com',
      password: 'password',
    };

    loginResponse = await request(app).post('/login').send(payload);

    db = getDatabase();
    const resultsCollection = db.collection('results');
    await resultsCollection.insertOne({
      content: 'new test content',
      status: 200,
      code: 'new test code',
      responseTime: 15,
      responseSize: 100,
      UserId: lastInsertedUser[0]._id,
    });

    newestResults = await resultsCollection
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
  });

  test('[Success] delete result successful', (done) => {
    request(app)
      .del(`/results/${newestResults[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('responseTime');
        expect(response.body).toHaveProperty('responseSize');
        expect(response.body).toHaveProperty('UserId');
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] delete result failed because invalid token', (done) => {
    request(app)
      .del(`/results/${newestResults[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty('message', 'Invalid access token');
        done();
      })
      .catch((err) => done(err));
  });

  test('[Failed] delete result failed because result id does not exist', (done) => {
    request(app)
      .del(`/results/618f6d283cdf446fd20beeee`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        console.log(response.body, '==============>>>>>>>>>');
        expect(response.status).toBe(500);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty(
          'message',
          'Internal Server Error'
        );
        done();
      })
      .catch((err) => done(err));
  });
});
