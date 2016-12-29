const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = +process.env.PORT || 8080

const images = fs.readdirSync(path.resolve(__dirname, './images'))

app.use('/styles', express.static('styles'))
app.use('/images', express.static('images'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { images })
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})
