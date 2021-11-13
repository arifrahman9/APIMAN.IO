if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
// const PORT = process.env.PORT || 3001
const routes = require("./routes")
const cors = require("cors")

// const { connect } = require("./config/mongo.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routes)

// connect().then(() => {
//   app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`)
//   })
// })

module.exports = app
