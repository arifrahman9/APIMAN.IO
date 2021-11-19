const readRequestValidation = async (req, res, next) => {
  try {
    if (!req.file) {
      throw { name: "noFile" };
    }

    if (req.file.mimetype !== "application/json") {
      throw { name: "wrongFileType" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = readRequestValidation;
