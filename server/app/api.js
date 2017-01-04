import {Router} from 'express'
import * as database from './database'
import * as images from './images'
import * as fs from 'fs'
import * as path from 'path'
import config from './config'
import multer from 'multer'

const upload = multer({
  dest: path.resolve(config.paths.data, 'temp')
})

function handleError(res) {
  return function (error) {
    console.error(error)
    return res.send({ error })
  }
}

function api(db) {
  const router = Router()

  router.get('/api/image/:name', (req, res) => {
    images.getImagePath(req.params.name)
      .then(path => res.sendFile(path))
      .catch(handleError(res))
  })

  router.get('/api/thumb/:name', (req, res) => {
    images.getThumbPath(req.params.name)
      .then(path => res.sendFile(path))
      .catch(handleError(res))
  })

  router.get('/api/images', (req, res) => {
    const count = +req.query.count
    if (isNaN(count)) {
      res.send({ error: 'Missing required parameter "count"' })
    } else {
      images.list(count)
        .then(images => res.send({ images }))
        .catch(handleError(res))
    }
  })

  router.get('/api/tags/:name', (req, res) => { })

  router.post('/api/tags/:name', (req, res) => { })

  router.post('/api/upload', upload.single('image'), (req, res) => {
    images.handleUpload(req.file)
      .then(name => res.send({ name }))
      .catch(handleError(res))
  })

  return router
}

export default api
