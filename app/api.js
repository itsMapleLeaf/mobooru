const {Router} = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const database = require("./database")

const upload = multer({
  dest: path.resolve(__dirname, '../../data/images')
})

function rename(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => err ? reject(err) : resolve())
  })
}

module.exports = function (db) {
  const router = Router()

  router.get('/api/image/:id', (req, res) => {
    database.getImagePath(db, req.params.id)
      .then(imagePath => res.sendFile(imagePath))
      .catch(error => res.send({ error }))
  })

  router.get('/api/thumb/:id', (req, res) => { })

  router.get('/api/tags/:id', (req, res) => { })

  router.get('/api/images', (req, res) => {
    database.getImages(db)
      .then(images => res.send({ images }))
  })

  router.post('/api/tag/:id/:tag', (req, res) => { })

  router.delete('/api/tag/:id/:tag', (req, res) => { })

  router.post('/api/upload', upload.single('image'), (req, res) => {
    const id = req.file.filename
    const {ext} = path.parse(req.file.originalname)
    const filename = req.file.path + ext

    rename(req.file.path, filename)
      .then(() => database.addImage(db, id, filename))
      .then(() => console.log(`added image ${id}`))
      .catch(err => console.error(err))
  })

  return router
}
