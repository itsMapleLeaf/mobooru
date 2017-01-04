import * as database from "./database"
import api from "./api"
import config from './config'
import express from "express"
import path from "path"

function init(db) {
  const app = express()

  app.use(express.static(config.paths.web))
  app.use(api(db))

  app.listen(config.server.port, () => {
    console.log(`Server listening on localhost:${config.server.port}`)
  })
}

function onDatabaseConnectError(err) {
  console.log(`Couldn't connect to database: ${err}`)
}

database.connect().then(init, onDatabaseConnectError)
