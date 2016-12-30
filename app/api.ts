import {Express} from 'express'
import {Db} from 'mongodb'
import multer from 'multer'
import * as path from 'path'
import * as database from './database'

const upload = multer({
  dest: path.resolve(__dirname, '../data/images')
})

export function init (app: Express, db: Db) {
  app.get('/image/:id', (req, res) => {
    database.getImagePath(db, req.params.id)
      .then(imagePath => res.sendFile(imagePath))
      .catch(error => res.send({ error }))
  })

  app.get('/thumb/:id', (req, res) => {})

  app.get('/tags/:id', (req, res) => {})

  app.get('/images', (req, res) => {
    database.getImages(db)
      .then(images => res.send({ images }))
  })

  app.post('/tag/:id/:tag', (req, res) => {})

  app.delete('/tag/:id/:tag', (req, res) => {})

  app.post('/upload', upload.single('image'), (req, res) => {
    const {filename} = req.file
    const id = filename

    database.addImage(db, id, filename)
      .then(() => console.log(`added image ${id}`))
      .catch(err => console.error(err))
  })
}
