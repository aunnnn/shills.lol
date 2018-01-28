const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DefinitionSchema = Schema({  
  
  list_id: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },

  text: {
    type: String,
    required: true    
  },

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

const model = initCollection()
model.Schema = DefinitionSchema
module.exports = model
