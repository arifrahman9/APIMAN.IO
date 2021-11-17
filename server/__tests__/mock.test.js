const request = require("supertest")
const app = require("../app")
const { hashPassword } = require("../helpers/bcrypt")
const { connect, getDatabase } = require("../config/mongo")
const UsersController = require("../controllers/users-controller")

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("GET", () => {
  jest.spyOn(UsersController, "testing").mockRejectedValueOnce({ message: "error" })
  test("[Failed]", (done) => {
    request(app)
      .get("/test-mock")
      .then((resp) => {
        console.log(resp.body)
        done()
      })
      .catch((err) => {
        done(err)
        console.log(err)
      })
  })
})
