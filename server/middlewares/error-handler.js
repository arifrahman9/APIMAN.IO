const errorHandler = (err, req, res, next) => {
  let message;
  let code;

  switch (err.name) {
    case 'requiredValidationError':
      code = 400;
      message = 'Field cannot be empty';
      break;

    case 'usernameUniqueValidationError':
      code = 400;
      message = 'Username must be unique';
      break;

    case 'emailUniqueValidationError':
      code = 400;
      message = 'Email must be unique';
      break;

    case 'unauthorized':
      code = 401;
      message = 'Invalid user / email or password';
      break;

    case 'JsonWebTokenError':
    case 'invalidToken':
      code = 401;
      message = 'Invalid access token';
      break;

    case 'notLoggedIn':
      code = 401;
      message = 'Please login first';
      break;

    case 'noFile':
      code = 400;
      message = 'you need to input the file';
      break;

    case 'wrongFileType':
      code = 400;
      message = 'file type needs to be application/json';
      break;

    case 'userDoesNotExist':
      code = 404;
      message = 'there is no user registered with that email';
      break;

    case 'emailFailed':
      code = 401;
      message = 'sending email failed';
      break;

    case 'tokenExpired':
      code = 401;
      message = 'Password reset token is invalid or has expired';
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
