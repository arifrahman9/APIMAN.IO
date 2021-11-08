const errorHandler = (err, req, res, next) => {
  let message;
  let code;

  switch (err.name) {
    case 'requiredValidationError':
      code = 400;
      message = 'field cannot be empty';
      break;

    case 'emailUniqueValidationError':
      code = 400;
      message = 'email must be unique';
      break;

    case 'JsonWebTokenError':
    case 'invalidToken':
      code = 401;
      message = 'invalid access token';
      break;

    case 'notLoggedIn':
      code = 401;
      message = 'please login first';
      break;

    default:
      code = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(code).json({
    message: message,
  });
};

module.exports = errorHandler;
