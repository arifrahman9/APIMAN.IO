const request = require("supertest")
const app = require("../app")
const { hashPassword } = require("../helpers/bcrypt")
const { connect, getDatabase } = require("../config/mongo")

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

describe("POST / login", () => {
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

  test("[Success] Response status 200 (login with username)", (done) => {
    request(app)
      .post("/login")
      .send({
        username: "acit",
        password: "acit",
      })
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.access_token).toEqual(expect.any(String))
        done()
      })
      .catch((err) => done(err))
  })

  test("[Failed] Should handle error when login (Invalid password)", (done) => {
    request(app)
      .post("/login")
      .send({
        username: "acit",
        password: "ridho",
      })
      .then((response) => {
        expect(response.status).toBe(401)
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

describe("GET / users / profile", (done) => {
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
        // console.log(response)
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
})
