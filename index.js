const express = require('express')

const app = express()
const port = +process.env.PORT || 8080

app.use('/styles', express.static('styles'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})
