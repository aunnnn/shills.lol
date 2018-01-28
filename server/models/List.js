const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = Schema({

  name: String,
  symbol: String,

  definitionsSubmitted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Definition'
    }
  ],

  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
})

const initCollection = () => {
  if(mongoose.models.List) {
    return mongoose.model('List')
  } else {
    return mongoose.model('List', ListSchema)
  }
}

module.exports = initCollection()
