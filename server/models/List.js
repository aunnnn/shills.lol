const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = Schema({

  // From CMC
  cmc_id: String,
  name: String,
  symbol: String,  
  rank: Number,
  percent_change_24h: String,
  percent_change_7d: String,
  price_usd: String,
  price_btc: String,
  market_cap_usd: String,
  cmc_last_updated: String,

  submitted_definitions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Definition'
    }
  ],

  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
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

const model = initCollection()
model.Schema = ListSchema
module.exports = model
