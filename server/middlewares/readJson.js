const FormData = require('form-data');
const fs = require('fs');

const readJsonFile = async (req, res, next) => {
  try {
    let requestsData = JSON.parse((fs.readFileSync = req.file), 'utf-8');

    req.body.file = requestsData;
  } catch (err) {
    next(err);
  }
};

module.exports = readJsonFile;
