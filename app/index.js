const express = require("express")
const path = require("path")
const api = require("./api")
const database = require("./database")
const config = require('./config')

database.connect().then(db => {
  const app = express()

  app.use(express.static(config.paths.web))
  app.use(api.default(db))

  app.listen(config.server.port, () => {
    console.log(`Server listening on localhost:${port}`)
  })
})
