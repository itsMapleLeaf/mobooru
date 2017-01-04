const {MongoClient} = require("mongodb")
const path = require("path")
const config = require('./config')

function connect() {
  return MongoClient.connect(config.db.url)
}

function getImage(db, id) {
  return db.collection('images').findOne({ id })
    .then(res => res || Promise.reject(`image with id "${id}" does not exist`))
    .then(res => res.imagePath || '')
}

function getImageList(db, count = 50) {
  return db.collection('images')
    .find({})
    .limit(count)
    .toArray()
    .then(images => images.map(img => img.id))
}

function registerImage(db, id, filename) {
  return db.collection('images').insert({ id, filename, tags: [] })
}

module.exports = {
  connect,
  getImage,
  getImageList,
  registerImage,
}
