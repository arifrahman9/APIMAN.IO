const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const UsersModel = require("../models/users-model")
const { OAuth2Client } = require("google-auth-library")


class UsersController {
  static async register(req, res, next) {
    try {
      const { username, email, password, firstName, lastName } = req.body

      if (!username || !email || !password || !firstName || !lastName) {
        throw { name: "requiredValidationError" }
      }

      const foundUsername = await UsersModel.findUserByUsername(username);

      if (foundUsername) {
        throw { name: "usernameUniqueValidationError" };
      }

      const foundUser = await UsersModel.findUserByEmail(email)

      if (foundUser) {
        throw { name: "emailUniqueValidationError" };
      }

      await UsersModel.register(req.body)

      const registeredUser = await UsersModel.getLastInsertedUser()

      res.status(200).json({
        id: registeredUser[0]._id,
        username: registeredUser[0].username,
        email: registeredUser[0].email,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { password } = req.body

      const loginResponse = await UsersModel.login(req.body)

      if (!loginResponse) {
        throw { name: "unauthorized" }
      }

      if (!comparePassword(password, loginResponse.password)) {
        throw { name: "unauthorized" };
      }

      if (!comparePassword(password, loginResponse.password)) {
        throw { name: "unauthorized" };
      }

      const payload = {
        id: loginResponse._id,
        username: loginResponse.username,
        email: loginResponse.email,
      }

      const token = createToken(payload)

      res.status(200).json({
        access_token: token,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getUserCredentials(req, res, next) {
    try {
      const user = await UsersModel.getLoggedInUser(req.user.id)

      res.status(200).json({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID)

      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      })

      const payload = ticket.getPayload()

      const loginGoogleResponse = await UsersModel.loginGoogle(payload)

      const payloadGoogle = {
        id: loginGoogleResponse._id,
        username: loginGoogleResponse.username,
        email: loginGoogleResponse.email,
      }

      const tokenFromGoogle = createToken(payloadGoogle)
      res.status(200).json({ access_token: tokenFromGoogle })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UsersController
