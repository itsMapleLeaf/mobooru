import * as fs from 'fs'
import * as path from 'path'

export function access(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, err => err ? reject(err) : resolve())
  })
}

export function mkdir(folder) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folder, err => err ? reject(err) : resolve())
  })
}

export function copyFile(inputFile, outputFile) {
  const folder = path.parse(outputFile).dir
  return access(folder)
    .catch(() => mkdir(folder))
    .then(() => new Promise((resolve, reject) => {
      fs.createReadStream(inputFile)
        .pipe(fs.createWriteStream(outputFile))
        .on('close', resolve)
        .on('error', reject)
    }))
}

export function removeFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, resolve)
  })
}
