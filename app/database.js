"use strict";
const mongodb_1 = require("mongodb");
const path = require("path");
const databaseURL = 'mongodb://localhost:27017';
function connect() {
    return mongodb_1.MongoClient.connect(databaseURL);
}
exports.connect = connect;
function getImagePath(db, id) {
    return db.collection('images').findOne({ id })
        .then(result => result || Promise.reject(`image for id ${id} not found`))
        .then(info => path.resolve(__dirname, '../data/images', info.filename));
}
exports.getImagePath = getImagePath;
function getImages(db) {
    return db.collection('images')
        .find({})
        .limit(10)
        .toArray()
        .then(images => images.map(img => img.id));
}
exports.getImages = getImages;
function addImage(db, id, filename) {
    return db.collection('images').insert({ id, filename });
}
exports.addImage = addImage;
