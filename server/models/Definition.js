const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DefinitionSchema = Schema({
  _id: Schema.Types.ObjectId,

  text: String,

  upvotes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },

  downvotes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
})

const initCollection = () => {
  if(mongoose.models.Definition) {
    return mongoose.model('Definition')
  } else {
    return mongoose.model('Definition', DefinitionSchema)
  }
}

module.exports = initCollection()
