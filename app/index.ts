import express from 'express'
import * as path from 'path'

import * as database from './database'
import * as api from './api'

const port = +process.env.PORT || 8080

database.connect().then(db => {
  const app = express()

  // app.set('view engine', 'pug')
  app.use(express.static(path.resolve(__dirname, '../static')))

  api.init(app, db)

  app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
  })
})
