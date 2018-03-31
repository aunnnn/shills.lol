const { send } = require('micro')
const List = require('../models/List')

const getList = async (req, res) => {
  const symbol = req.params.symbol
  const data = await List.findOne({ symbol })
  .populate({ 
    path: 'submitted_definitions', 
    model: 'Definition',
    options: {
      sort: { upvotes: -1 },
      limit: 25,
    }
  }).exec()

  // console.log(typeof data)
  // data['cmc_url'] = `https://coinmarketcap.com/currencies/${data.cmc_id}/`
  // data['cmc_icon'] = `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.cmc_asset_id}.png`
  
  console.log(data)
  send(res, 200, {
    // list: data,
    list: {
      cmc_url: `https://coinmarketcap.com/currencies/${data.cmc_id}/`,
      cmc_icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.cmc_asset_id}.png`,
      ...data._doc
    }
  })
}

module.exports = getList
