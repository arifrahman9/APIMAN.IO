const errorHandler = (err, req, res, next) => {
  let message;
  let code;

  switch (err.name) {
    case "requiredValidationError":
      code = 400;
      message = "Field cannot be empty";
      break;

    case "usernameUniqueValidationError":
      code = 400;
      message = "Username must be unique";
      break;

    case "emailUniqueValidationError":
      code = 400;
      message = "Email must be unique";
      break;

    case "unauthorized":
      code = 401;
      message = "Invalid user / email or password";
      break;

    case "JsonWebTokenError":
    case "invalidToken":
      code = 401;
      message = "Invalid access token";
      break;

    case "notLoggedIn":
      code = 401;
      message = "Please login first";
      break;

    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(code).json({
    message: message,
  });
};

module.exports = errorHandler;
