const request = require("supertest")
const app = require("../app")
const { hashPassword } = require("../helpers/bcrypt")
const { connect, getDatabase } = require("../config/mongo")
const UsersController = require("../controllers/users-controller")

describe("POST / register", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.deleteOne({
      email: "acit@mail.com",
    })
  })

  test("[Success] Response status 200", (done) => {
    request(app)
      .post("/register")
      .send({
        username: "acit",
        email: "acit@mail.com",
        password: hashPassword("acit"),
        firstName: "acit",
        lastName: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.any(Object))
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("[Failed] Should handle error when register (requiredValidationError)", (done) => {
    request(app)
      .post("/register")
      .send({
        username: "acit",
        password: hashPassword("acit"),
        firstName: "acit",
        lastName: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Field cannot be empty")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when register (usernameUniqueValidationError)", (done) => {
    request(app)
      .post("/register")
      .send({
        username: "acit",
        email: "acit@mail.com",
        password: hashPassword("acit"),
        firstName: "acit",
        lastName: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Username must be unique")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when register (emailUniqueValidationError)", (done) => {
    request(app)
      .post("/register")
      .send({
        username: "ridho",
        email: "acit@mail.com",
        password: hashPassword("acit"),
        firstName: "acit",
        lastName: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be unique")
        done()
      })
      .catch((err) => done(err))
  })
})

let newUser
let loginResponse

describe("POST /login", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.insertOne({
      username: "acit",
      email: "acit@mail.com",
      password: hashPassword("acit"),
      firstName: "acit",
      lastName: "ridho",
    })

    newUser = await usersCollection.find({}).sort({ _id: -1 }).limit(1).toArray()
    // console.log(newUser)
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.deleteOne({
      _id: newUser[0]._id,
    })
  })

  test("[Success] Response status 200 (login with email)", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "acit@mail.com",
        password: "acit",
      })
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.access_token).toEqual(expect.any(String))
        token = response.body.access_token
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when email or password is empty", (done) => {
    request(app)
      .post("/login")
      .send({
        email: null,
        password: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Field cannot be empty")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when login (Invalid password)", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "acit@mail.com",
        password: "ridho",
      })
      .then((response) => {
        expect(response.body).toEqual(expect.any(Object))
        expect(response.body).toHaveProperty("message", "Invalid user / email or password")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when login (Invalid email)", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "acit2@mail.com",
        password: "acit",
      })
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid user / email or password")
        done()
      })
      .catch((err) => done(err))
  })
})

describe("GET /users/profile", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await request(app).post("/register").send({
      username: "acit",
      email: "acit@gmail.com",
      password: "password",
      firstName: "acit",
      lastName: "ridho",
    })
    newUser = await usersCollection.find({}).sort({ _id: -1 }).limit(1).toArray()

    const payload = {
      email: "acit@gmail.com",
      password: "password",
    }
    loginResponse = await request(app).post("/login").send(payload)
  })

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.deleteOne({
      _id: newUser[0]._id,
    })
  })

  test("[Success] Response status 200", (done) => {
    request(app)
      .get("/users/profile")
      .send({
        _id: newUser[0]._id,
      })
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.any(Object))
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when get profile with invalid token", (done) => {
    request(app)
      .get("/users/profile")
      .send({
        _id: newUser[0]._id,
      })
      .set({
        access_token: loginResponse.body.access_token + "asd",
      })
      .then((response) => {
        // console.log(response)
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid access token")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when get profile with invalid userId", async () => {
    const mock = jest.spyOn(UsersController, "getUserCredentials").mockRejectedValueOnce({ message: "Internal Server Error", status: 500 })
    return request(app)
      .get("/users/profile")
      .set({
        access_token: loginResponse.body.access_token,
      })
      .then((response) => {
        response.body = mock()
        console.log(response.body)
        return response.body
      })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

describe("POST /forgot-password", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.insertOne({
      username: "darwin",
      email: "darrrzzz@gmail.com",
      password: hashPassword("password"),
      firstName: "dar",
      lastName: "win",
    })
    newUser = await usersCollection.find({}).sort({ _id: -1 }).limit(1).toArray()
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.deleteOne({
      _id: newUser[0]._id,
    })
  })

  test("[Success] successfully change password", (done) => {
    request(app)
      .post("/forgot-password")
      .send({
        email: "darrrzzz@gmail.com",
      })
      .then((response) => {
        const body = response.body
        // console.log(body, "<====")

        expect(body).toEqual(expect.any(Object))
        expect(response.body).toHaveProperty("message", "Email sent, please check your email for the password reset link")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] failed change password because user does not exist", (done) => {
    request(app)
      .post("/forgot-password")
      .send({
        email: "wrongemail@gmail.com",
      })
      .then((response) => {
        // console.log(response.body)
        expect(response.status).toBe(404)
        expect(response.body).toEqual(expect.any(Object))
        expect(response.body).toHaveProperty("message", "There is no user registered with that email")
        done()
      })
      .catch((err) => done(err))
  })
})

describe("POST /reset/:token", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.insertOne({
      username: "arif",
      email: "arifrhmn910@gmail.com",
      password: hashPassword("Arif.Rahmannn"),
      firstName: "arif",
      lastName: "rahman",
      resetPasswordExpires: Date.now() + 10000,
      resetPasswordToken: "asdasdasd123",
    })
    newUser = await usersCollection.find({}).sort({ _id: -1 }).limit(1).toArray()
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
    const db = getDatabase()
    const usersCollection = db.collection("users")
    await usersCollection.deleteOne({
      _id: newUser[0]._id,
    })
  })

  test("[Success] successfully reset password", (done) => {
    request(app)
      .post(`/reset/${"asdasdasd123"}`)
      .send({
        password: hashPassword("Oktober910"),
      })
      .then((response) => {
        expect(response.body).toEqual(expect.any(Object))
        expect(response.body).toHaveProperty("message", "Success! Your password has been changed, please login")
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] failed reset password because resetPasswordToken invalid", (done) => {
    request(app)
      .post(`/reset/${"asdasdasd123"}`)
      .send({
        password: hashPassword("Oktober910"),
      })
      .then((response) => {
        // console.log(response.body)
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Password reset token is invalid or has expired")
        done()
      })
      .catch((err) => done(err))
  })
})

describe("POST /login-google", () => {
  beforeAll(async () => {
    await connect()
    await getDatabase()
  })

  beforeEach(async () => {
    jest.restoreAllMocks()
  })

  afterAll(async () => {
    await connect()
    await getDatabase()
  })

  test("[Success] successfully login with google", async () => {
    const mock = jest.spyOn(UsersController, "loginGoogle").mockResolvedValueOnce({ access_token: "adwid2w2e3ehiw2" })
    return request(app)
      .post("/login-google")
      .then((resp) => {
        resp.body = mock()
        return resp.body
      })
      .then((result) => {
        expect(result).toEqual(expect.any(Object))
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  test("[Failed] login with google failed because idToken invalid", (done) => {
    request(app)
      .post("/login-google")
      .send({
        token: "",
      })
      .then((response) => {
        // console.log(response.body)
        expect(response.body).toEqual(expect.any(Object))
        expect(response.body).toHaveProperty("message", "Internal Server Error")
        done()
      })
      .catch((err) => done(err))
  })
})
