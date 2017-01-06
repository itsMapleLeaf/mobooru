import {handleAPIError} from '../util/express'
import {Router} from 'express'
import * as image from '../models/image'

const router = Router()

router.get('/api/list', (req, res) => {
  const count = +req.query.count
  if (isNaN(count)) {
    res.send({ error: 'Missing required parameter "count"' })
  } else {
    image.list(count)
      .then(images => res.send({ images }))
      .catch(handleAPIError(res))
  }
})

export default router
