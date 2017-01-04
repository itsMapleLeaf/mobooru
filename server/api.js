const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const database = require('./database')
const config = require('./config')

const upload = multer({
  dest: path.resolve(config.paths.data, 'temp')
})

function copy(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(inputFile)
      .pipe(fs.createWriteStream(outputFile))
      .on('close', resolve)
      .on('error', reject)
  })
}

function handleError(res) {
  return function (error) {
    console.error(error)
    return res.send({ error })
  }
}

function api(db) {
  const router = Router()

  router.get('/api/image/:id', (req, res) => {
    database.getImage(db, req.params.id)
      .then(imagePath => res.sendFile(imagePath))
      .catch(handleError(res))
  })

  router.get('/api/thumb/:id', (req, res) => { })

  router.get('/api/tags/:id', (req, res) => { })

  router.get('/api/images', (req, res) => {
    const count = +(req.query.count || 50)
    database.getImageList(db, count)
      .then(images => res.send({ images }))
      .catch(handleError(res))
  })

  router.get('/api/tags/:id', (req, res) => { })

  router.post('/api/tags/:id', (req, res) => { })

  router.post('/api/upload', upload.single('image'), (req, res) => {
    const id = req.file.filename
    const extension = path.parse(req.file.originalname).ext
    const imagePath = path.resolve(config.paths.data, 'images', id + extension)
    const thumbPath = path.resolve(config.paths.data, 'thumb', id + extension)

    Promise.all([
      copy(req.file.path, imagePath),
      copy(req.file.path, thumbPath),
    ])
    .then(() => database.registerImage(db, id, imagePath, thumbPath))
    .then(() => res.send({ error: null }))
    .catch(handleError(res))
  })

  return router
}

module.exports = api
