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

    case 'unauthorized':
      code = 401;
      message = 'invalid user/email or password';
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

    case 'noFile':
      code = 400;
      message = 'you need to input the file';
      break;

    case 'wrongFileType':
      code = 400;
      message = 'file type needs to be application/json';
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
