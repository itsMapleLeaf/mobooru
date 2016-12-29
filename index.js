const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = +process.env.PORT || 8080

const images = fs.readdirSync(path.resolve(__dirname, './images'))

app.use('/styles', express.static('styles'))
app.use('/scripts', express.static('scripts'))
app.use('/images', express.static('images'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/images', (req, res) => {
  res.send({ images: images.slice(0, 3) })
})

app.get('/api/images/:previous', (req, res) => {
  const index = images.indexOf(req.params.previous)
  const start = index + 1
  const end = Math.min(index + 4, images.length)
  res.send({ images: images.slice(start, end) })
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})
