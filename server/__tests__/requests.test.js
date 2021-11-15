const request = require('supertest');
const app = require('../app');
const mongodb = require('mongodb');
const { connect, getDatabase } = require('../config/mongo');

let newestRequest;
let lastInsertedUser;
let loginResponse;
let db;

describe('GET /requests', () => {
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
    const requestsCollection = db.collection('requests');

    await requestsCollection.insertOne({
      method: 'GET',
      url: 'http://test-url.com/test',
      UserId: lastInsertedUser[0]._id,
    });

    newestRequest = await requestsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const requestsCollection = db.collection('requests');

    await requestsCollection.deleteOne({
      _id: newestRequest[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly fetched requests that belongs to the user', (done) => {
    request(app)
      .get('/requests')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Array));
        expect(body[0]).toHaveProperty('_id');
        expect(body[0]).toHaveProperty('method');
        expect(body[0]).toHaveProperty('url');
        expect(body[0]).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch collections becuase of invalid token', (done) => {
    request(app)
      .get('/requests')
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
});

describe('GET /requests/:id', () => {
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
    const requestsCollection = db.collection('requests');

    await requestsCollection.insertOne({
      method: 'GET',
      url: 'http://test-url.com/test',
      UserId: lastInsertedUser[0]._id,
    });

    newestRequest = await requestsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const requestsCollection = db.collection('requests');

    await requestsCollection.deleteOne({
      _id: newestRequest[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly fetched request by id', (done) => {
    request(app)
      .get(`/requests/${newestRequest[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to fetch request by id because of invalid token', (done) => {
    request(app)
      .get(`/requests/${newestRequest[0]._id}`)
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

  test('[failed] failed to fetch request by id because request does not exist', (done) => {
    request(app)
      .get('/requests/618f6d283cdf446fd20beeee')
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

describe('POST /requests', () => {
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
    const requestsCollection = db.collection('requests');

    await requestsCollection.insertOne({
      method: 'GET',
      url: 'http://test-url.com/test',
      UserId: lastInsertedUser[0]._id,
    });

    newestRequest = await requestsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const requestsCollection = db.collection('requests');

    await requestsCollection.deleteOne({
      _id: newestRequest[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly hit external API', (done) => {
    request(app)
      .post('/requests')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: 'https://darwin-blog-challenge-1-p2.herokuapp.com/posts',
        method: 'GET',
        headers: [
          {
            key: 'access_token',
            value:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2Nzk1ODYyfQ.fHc7RcbOY7Dqqde12_j9IupjuVYtmxOIZ7GBY1UyNWU',
          },
        ],
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('response');
        expect(body).toHaveProperty('responseTime');
        expect(body).toHaveProperty('newAddedHistory');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success] successfuly hit external API with raw bodies parameter', (done) => {
    request(app)
      .post('/requests')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: 'https://darwin-blog-challenge-1-p2.herokuapp.com/login',
        method: 'POST',
        bodies: {
          email: 'email2@gmail.com',
          password: 'password',
        },
        bodyIsRaw: true,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('response');
        expect(body).toHaveProperty('responseTime');
        expect(body).toHaveProperty('newAddedHistory');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success] successfuly hit external API with params', (done) => {
    request(app)
      .post('/requests')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: 'https://api.jikan.moe/v3/manga/1/characters',
        method: 'GET',
        params: [
          {
            key: 'q',
            value: 'a',
          },
        ],
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('response');
        expect(body).toHaveProperty('responseTime');
        expect(body).toHaveProperty('newAddedHistory');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[success] successfuly recieved error message from external API', (done) => {
    request(app)
      .post('/requests')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .send({
        url: 'https://darwin-blog-challenge-1-p2.herokuapp.com/posts',
        method: 'GET',
        headers: [
          {
            key: 'access_token',
            value:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2Nzk1ODYyfQ.fHc7RcbOY7Dqqde12_j9IupjuVYtmxOIZ7GBY1UyNW',
          },
        ],
      })
      .then((response) => {
        const body = response.body;
        console.log(body, '<====');

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('response');
        expect(body).toHaveProperty('responseTime');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /requests/read', () => {
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
    const requestsCollection = db.collection('requests');

    await requestsCollection.insertOne({
      method: 'GET',
      url: 'http://test-url.com/test',
      UserId: lastInsertedUser[0]._id,
    });

    newestRequest = await requestsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const requestsCollection = db.collection('requests');

    await requestsCollection.deleteOne({
      _id: newestRequest[0]._id,
    });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly read json file', (done) => {
    request(app)
      .post('/requests/read')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .attach('requests', 'tes-requests.json')
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Array));
        expect(body[0]).toHaveProperty('method');
        expect(body[0]).toHaveProperty('url');
        expect(body[0]).toHaveProperty('UserId');
        expect(body[0]).toHaveProperty('_id');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed read json file because file is not attached', (done) => {
    request(app)
      .post('/requests/read')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .attach('requests', '')
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'You need to input the file');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed read json file because the file type is not json', (done) => {
    request(app)
      .post('/requests/read')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .attach('requests', '.gitignore')
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty(
          'message',
          'File type needs to be application/json'
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('DELETE /requests/:id', () => {
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
    const requestsCollection = db.collection('requests');

    await requestsCollection.insertOne({
      method: 'GET',
      url: 'http://test-url.com/test',
      UserId: lastInsertedUser[0]._id,
    });

    newestRequest = await requestsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
  });

  afterAll(async () => {
    await connect();
    await getDatabase();

    db = getDatabase();
    const requestsCollection = db.collection('requests');

    // await requestsCollection.deleteOne({
    //   _id: newestRequest[0]._id,
    // });

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({
      _id: lastInsertedUser[0]._id,
    });
  });

  test('[success] successfuly deleted request by ID', (done) => {
    request(app)
      .delete(`/requests/${newestRequest[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('method');
        expect(body).toHaveProperty('url');
        expect(body).toHaveProperty('UserId');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to delete request by ID because of invalid token', (done) => {
    request(app)
      .delete(`/requests/${newestRequest[0]._id}`)
      .set({
        access_token: loginResponse.body.access_token + 'asd',
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Invalid access token');

        const requestsCollection = db.collection('requests');
        requestsCollection.deleteOne({
          _id: newestRequest[0]._id,
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('[failed] failed to delete request by ID because the request does not exist', (done) => {
    request(app)
      .delete('/requests/618f6d283cdf446fd20beeee')
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        const body = response.body;

        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty('message', 'Internal Server Error');

        const requestsCollection = db.collection('requests');
        requestsCollection.deleteOne({
          _id: newestRequest[0]._id,
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
