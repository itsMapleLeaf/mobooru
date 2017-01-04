import * as fs from 'fs'

export function copyFile(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(inputFile)
      .pipe(fs.createWriteStream(outputFile))
      .on('close', resolve)
      .on('error', reject)
  })
}

export function removeFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, resolve)
  })
}
