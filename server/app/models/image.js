import {query} from '../util/database'
import * as path from 'path'
import * as fs from '../util/fs'
import config from '../config'

export function getInfo(name) {
  return query(db => db.collection('images').findOne({ name }))
    .then(res => res || Promise.reject(`Error getting ${name}: does not exist`))
}

export function getImagePath(name) {
  return getInfo(name)
    .then(res => path.resolve(config.paths.data, 'images', res.name))
}

export function getThumbPath(name) {
  return getInfo(name)
    .then(res => path.resolve(config.paths.data, 'thumb', res.name))
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
    fs.copyFile(fileInfo.path, imagePath),
    fs.copyFile(fileInfo.path, thumbPath),
  ])
  .then(() => fs.removeFile(fileInfo.path))
  .then(() => register(name))
  .then(() => name)
}

export function register(name) {
  return query(db => db.collection('images').insert({ name, tags: [] }))
}
