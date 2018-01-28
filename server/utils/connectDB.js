const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/whatsthecoin', {
    promiseLibrary: global.Promise,
  })
  const db = mongoose.connection
  db.on('error', (err) => {
    console.error('Mongo connection error: ', err)
  })
  db.once('open', () => {
    console.log('Mongo connect successfully.')
  })
}

module.exports = connectDB
