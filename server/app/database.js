import {MongoClient} from 'mongodb'
import config from './config'

export function connect() {
  return MongoClient.connect(config.db.url)
}

export function query(func) {
  return connect().then(db => {
    const res = func(db)
    db.close()
    return res
  })
}
