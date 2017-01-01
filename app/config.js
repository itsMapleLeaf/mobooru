module.exports = {
  server: {
    port: +process.env.PORT || 3000,
  },
  db: {
    url: 'mongodb://localhost:27017',
  },
  paths: {
    web: path.resolve(__dirname, '../web'),
    data: path.resolve(__dirname, '../data'),
  }
}
