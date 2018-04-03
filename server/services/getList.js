const { send } = require('micro')
const List = require('../models/List')

const getList = async (req, res) => {
  const symbol = req.params.symbol
  const data = await List.findOne({ symbol })
  .populate({ 
    path: 'submitted_definitions', 
    model: 'Definition',
    options: {
      sort: { upvotes: -1 }
    }
  }).exec()

  send(res, 200, {
    list: {
      cmc_url: `https://coinmarketcap.com/currencies/${data.cmc_id}/`,
      cmc_icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.cmc_asset_id}.png`,
      ...data._doc
    }
  })
}

module.exports = getList
