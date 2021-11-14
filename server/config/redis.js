const Redis = require('ioredis');
let redis;

if (process.env.NODE_ENV !== 'production') {
  redis = new Redis();
} else {
  console.log('pake redis labs');
  redis = new Redis({
    port: process.env.REDIS_LAB_PORT,
    host: process.env.REDIS_LAB_URL,
    password: process.env.REDIS_LAB_PASSWORD,
  });
}

module.exports = redis;
