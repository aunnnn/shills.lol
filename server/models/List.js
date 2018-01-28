const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = Schema({
  _id: Schema.Types.ObjectId,

  name: String,
  symbol: String,

  
  definitions: []
})

const initCollection = () => {
  if(mongoose.models.List) {
    return mongoose.model('List')
  } else {
    return mongoose.model('List', ListSchema)
  }
}

module.exports = initCollection()
