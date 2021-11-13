const app = require('../app');
const PORT = process.env.PORT || 3001;

const { connect } = require('../config/mongo');

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
