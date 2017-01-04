import {query} from './database'
import * as path from 'path'
import config from './config'

function copy(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(inputFile)
      .pipe(fs.createWriteStream(outputFile))
      .on('close', resolve)
      .on('error', reject)
  })
}

function remove(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, resolve)
  })
}

export function getImageInfo(name) {
  return query(db => db.collection('images').findOne({ name })
    .then(res => res || Promise.reject(`Error getting ${name}: does not exist`))
}

export function getImagePath(name) {
  return getImageInfo(name)
    .then(res => resolve(config.paths.data, 'images', res.name))
}

export function getThumbPath(name) {
  return getImageInfo(name)
    .then(res => resolve(config.paths.data, 'thumb', res.name))
}

export function list(count = 50) {
  return query(db => db.collection('images').find({}).limit(count).toArray())
    .then(images => images.map(img => img.name))
}

export function handleUpload(fileInfo) {
  const extension = path.parse(fileInfo.originalname).ext
  const name = fileInfo.filename + extension

  const imagePath = path.resolve(config.paths.data, 'images', name)
  const thumbPath = path.resolve(config.paths.data, 'thumb', name)

  return Promise.all([
    copy(fileInfo.path, imagePath),
    copy(fileInfo.path, thumbPath),
  ])
  .then(() => remove(fileInfo.path))
  .then(() => register(name))
  .then(() => name)
}

export function register(name) {
  return query(db => db.collection('images').insert({ name, tags: [] })
}
