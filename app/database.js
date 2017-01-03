const {MongoClient} = require("mongodb")
const path = require("path")
const config = require('./config')

function connect() {
  return MongoClient.connect(config.db.url)
}

function getImagePath(db, id) {
  return db.collection('images').findOne({ id })
    .then(result => result || Promise.reject(`image path for id ${id} not found`))
    .then(info => path.resolve(config.paths.data, 'images', info.filename))
}

function getImages(db) {
  return db.collection('images')
    .find({})
    .limit(10)
    .toArray()
    .then(images => images.map(img => img.id))
}

function addImage(db, id, filename) {
  return db.collection('images').insert({ id, filename })
}

module.exports = {
  connect,
  getImagePath,
  getImages,
  addImage,
}
