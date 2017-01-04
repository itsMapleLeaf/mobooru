import {MongoClient} from "mongodb"
import path from "path"
import config from './config'

export function connect() {
  return MongoClient.connect(config.db.url)
}

export function getImage(db, id) {
  return db.collection('images').findOne({ id })
    .then(res => res || Promise.reject(`image with id "${id}" does not exist`))
    .then(res => res.imagePath || '')
}

export function getImageList(db, count = 50) {
  return db.collection('images')
    .find({})
    .limit(count)
    .toArray()
    .then(images => images.map(img => img.id))
}

export function registerImage(db, id, filename) {
  return db.collection('images').insert({ id, filename, tags: [] })
}
