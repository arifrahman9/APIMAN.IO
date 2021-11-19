const { MongoClient } = require('mongodb');
let client;

if (process.env.NODE_ENV !== 'production') {
  const url = 'mongodb://127.0.0.1:27017';
  client = new MongoClient(url);
} else {
  console.log('pake atlas');
  const uri = process.env.MONGOATLAS_URL;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const dbName = 'apiman';
let database = null;

async function connect() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  database = db;
}

function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
