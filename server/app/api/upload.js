import {handleAPIError} from '../util/express'
import {Router} from 'express'
import * as images from '../models/image'
import * as path from 'path'
import config from '../config'
import multer from 'multer'

const upload = multer({
  dest: path.resolve(config.paths.data, 'temp')
})

const router = Router()

router.post('/api/upload', upload.single('image'), (req, res) => {
  images.handleUpload(req.file)
    .then(name => res.send({ name }))
    .catch(handleAPIError(res))
})

export default router
