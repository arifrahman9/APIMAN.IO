const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);

const dbName = 'apiman-test';
let database = null;

async function connect() {
  await client.connect();
  console.log('Connected successfully to test server');
  const db = client.db(dbName);

  database = db;
}

function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
