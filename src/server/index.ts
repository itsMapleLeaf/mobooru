import * as express from 'express'
import * as path from 'path'
import api from './api'
import * as database from './database'

const port = +process.env.PORT || 8080

database.connect().then(db => {
  const app = express()

  app.use(express.static(path.resolve(__dirname, '../web')))
  app.use(api(db))

  app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
  })
})
