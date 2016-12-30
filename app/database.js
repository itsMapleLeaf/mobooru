const {MongoClient} = require('mongodb')
const path = require('path')

const databaseURL = 'mongodb://localhost:27017'

function connect () {
  return MongoClient.connect(databaseURL)
}

function getImagePath (db, id) {
  return db.collection('images').findOne({ id })
    .then(result => result || Promise.reject(`image for id ${id} not found`))
    .then(info => path.resolve(__dirname, '../data/images', info.filename))
}

function getImages (db) {
  return db.collection('images')
    .find({})
    .limit(10)
    .toArray()
    .then(images => images.map(img => img.id))
}

function addImage (db, id, filename) {
  return db.collection('images').insert({ id, filename })
}

// function addImage(id, filepath) {
//   return db.collection('images')

// }

// function fetchImages() {
//   return db.collection('images')
//     .then(images => images.find({}))
//     .then(images => images.toArray())
// }

module.exports = {
  connect,
  getImages,
  getImagePath,
  addImage
}
