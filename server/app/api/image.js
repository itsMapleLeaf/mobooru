import {handleAPIError} from '../util/express'
import {Router} from 'express'
import * as images from '../models/image'

const router = Router()

router.get('/api/image/:name/full', (req, res) => {
  images.getImagePath(req.params.name)
    .then(path => res.sendFile(path))
    .catch(handleAPIError(res))
})

router.get('/api/image/:name/thumb', (req, res) => {
  images.getThumbPath(req.params.name)
    .then(path => res.sendFile(path))
    .catch(handleAPIError(res))
})

router.get('/api/image/:name/tags', (req, res) => {})

router.post('/api/image/:name/tags', (req, res) => {})

export default router
