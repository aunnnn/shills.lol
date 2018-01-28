const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TagSchema = Schema({
  _id: Schema.Types.ObjectId,
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
