const mongodb = require("mongodb")
const path = require("path")
const config = require('./config')

const databaseURL = 'mongodb://localhost:27017'

exports.connect = function () {
  return mongodb.MongoClient.connect(databaseURL)
}

exports.getImagePath = function (db, id) {
  return db.collection('images').findOne({ id })
    .then(result => result || Promise.reject(`image path for id ${id} not found`))
    .then(info => path.resolve(config.paths.data, 'images', info.filename))
}

exports.getImages = function (db) {
  return db.collection('images')
    .find({})
    .limit(10)
    .toArray()
    .then(images => images.map(img => img.id))
}

exports.addImage = function (db, id, filename) {
  return db.collection('images').insert({ id, filename })
}
