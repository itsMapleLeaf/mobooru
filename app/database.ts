import {MongoClient, Db, InsertOneWriteOpResult} from 'mongodb'
import * as path from 'path'

const databaseURL = 'mongodb://localhost:27017'

export function connect(): Promise<Db> {
  return MongoClient.connect(databaseURL)
}

export function getImagePath(db: Db, id: string): Promise<string> {
  return db.collection('images').findOne({ id })
    .then(result => result || Promise.reject(`image for id ${id} not found`))
    .then(info => path.resolve(__dirname, '../data/images', info.filename))
}

export function getImages(db: Db): Promise<string[]> {
  return db.collection('images')
    .find({})
    .limit(10)
    .toArray()
    .then(images => images.map(img => img.id))
}

export function addImage(db: Db, id: string, filename: string): Promise<InsertOneWriteOpResult> {
  return db.collection('images').insert({ id, filename })
}
