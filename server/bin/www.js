const app = require("../app.js")
const PORT = process.env.PORT || 3001
const { connect } = require("../config/mongo.js")

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
})
