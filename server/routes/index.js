const express = require("express")
const router = express.Router()

const errorHandler = require("../middlewares/error-handler")
const authentication = require("../middlewares/authentication")

const requests = require("./requests-router")
const users = require("./users-router")
const collections = require("./collections-router")
const results = require("./results-router")
const UsersController = require("../controllers/users-controller")

router.post("/register", UsersController.register)
router.post("/login", UsersController.login)

router.use(authentication)

router.use("/requests", requests)
router.use("/users", users)
router.use("/collections", collections)
router.use("/results", results)

router.use(errorHandler)

module.exports = router
