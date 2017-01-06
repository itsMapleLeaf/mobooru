import {handleAPIError} from '../util/express'
import {Router} from 'express'
import * as image from '../models/image'

const router = Router()

router.get('/api/image/:name', (req, res) => {
  image.getImagePath(req.params.name)
    .then(path => res.sendFile(path))
    .catch(handleAPIError(res))
})

router.get('/api/image/:name/thumb', (req, res) => {
  image.getThumbPath(req.params.name)
    .then(path => res.sendFile(path))
    .catch(handleAPIError(res))
})

router.get('/api/image/:name/tags', (req, res) => {})

router.post('/api/image/:name/tags', (req, res) => {})

export default router
