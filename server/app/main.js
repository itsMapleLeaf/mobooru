import image from './api/image'
import list from './api/list'
import upload from './api/upload'
import config from './config'
import express from 'express'

const app = express()

app.use(express.static(config.paths.web))
app.use(image)
app.use(list)
app.use(upload)

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server listening on ${config.server.host}:${config.server.port}`)
})
