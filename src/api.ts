import {Express} from 'express'
import {Db} from 'mongodb'
import * as multer from 'multer'
import * as path from 'path'
import * as fs from 'fs'
import * as database from './database'

const upload = multer({
  dest: path.resolve(__dirname, '../data/images')
})

function rename (oldPath: string, newPath: string) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => err ? reject(err) : resolve())
  })
}

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
    const id = req.file.filename
    const extension = path.parse(req.file.originalname).ext
    const filename = req.file.path + extension

    rename(req.file.path, filename)
      .then(() => database.addImage(db, id, filename))
      .then(() => console.log(`added image ${id}`))
      .catch(err => console.error(err))
  })
}
