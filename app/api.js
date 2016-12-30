const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const database = require('./database')

const upload = multer({
  dest: path.resolve(__dirname, '../data/images')
})

function init (app, db) {
  app.get('/image/:id', (req, res) => {
    database.getImagePath(db, req.params.id)
      .then(imagePath => res.sendFile(imagePath))
      .catch(error => res.send({ error }))
  })

  app.get('/thumb/:id', (req, res) => {})

  app.get('/tags/:id', (req, res) => {})

  app.get('/images', bodyParser.json(), (req, res) => {
    database.getImages(db)
      .then(images => res.send({ images }))
  })

  app.post('/tag/:id/:tag', (req, res) => {})

  app.delete('/tag/:id/:tag', (req, res) => {})

  app.post('/upload', upload.single('image'), (req, res) => {
    const {filename} = req.file
    const id = filename

    database.addImage(id, filename)
      .then(() => console.log(`added image ${id}`))
      .catch(err => console.error(err))
  })

  // app.get('/api/images', (req, res) => {
  //   // res.send({ images: images.slice(0, 3) })
  // })

  // app.get('/api/images/:previous', (req, res) => {
  //   // const index = images.indexOf(req.params.previous)
  //   // const start = index + 1
  //   // const end = Math.min(index + 4, images.length)
  //   // res.send({ images: images.slice(start, end) })
  // })
}

module.exports = { init }
