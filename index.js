const express = require('express')
const fs = require('fs')
const path = require('path')

const port = +process.env.PORT || 8080

const app = express()

app.set('view engine', 'pug')

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/images', (req, res) => {
  // res.send({ images: images.slice(0, 3) })
})

app.get('/api/images/:previous', (req, res) => {
  // const index = images.indexOf(req.params.previous)
  // const start = index + 1
  // const end = Math.min(index + 4, images.length)
  // res.send({ images: images.slice(start, end) })
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})
