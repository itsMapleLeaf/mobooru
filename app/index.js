const express = require('express')
const database = require('./database')
const api = require('./api')

const port = +process.env.PORT || 8080

database.connect().then(db => {
  const app = express()

  // app.set('view engine', 'pug')
  app.use(express.static('static'))

  api.init(app, db)

  app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
  })
})
