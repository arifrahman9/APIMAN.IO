const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const UsersModel = require('../models/users-model');

class UsersController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!username || !email || !password || !phoneNumber || !address) {
        throw { name: 'requiredValidationError' };
      }

      const foundUser = await UsersModel.findUserByEmail(email);

      if (foundUser) {
        throw { name: 'emailUniqueValidationError' };
      }

      await UsersModel.register(req.body);

      const registeredUser = await UsersModel.getLastInsertedUser();

      res.status(200).json({
        id: registeredUser[0]._id,
        username: registeredUser[0].username,
        email: registeredUser[0].email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UsersController;
