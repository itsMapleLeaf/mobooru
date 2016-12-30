const {MongoClient} = require('mongodb')

const databaseURL = 'mongodb://localhost:27017'

function connect () {
  return MongoClient.connect(databaseURL)
}

// function addImage(id, filepath) {
//   return db.collection('images')

// }

// function fetchImages() {
//   return db.collection('images')
//     .then(images => images.find({}))
//     .then(images => images.toArray())
// }

module.exports = { connect }
