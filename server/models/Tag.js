const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TagSchema = Schema({
  title: String
})

const initCollection = () => {
  if(mongoose.models.Tag) {
    return mongoose.model('Tag')
  } else {
    return mongoose.model('Tag', TagSchema)
  }
}

module.exports = initCollection()
