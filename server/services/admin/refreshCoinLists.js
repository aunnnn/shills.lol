const { send } = require('micro')
const fetch = require('node-fetch')
const List = require('../../models/List')
const refreshAssetIds = require('./refreshCMCAssetIds')

const refreshCoinLists = async (req, res) => {
  const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
  const coins = await response.json()

  const beforeLength = await List.count({})

  for (let c of coins) {
    await List.updateOne({ cmc_id: c.id }, {
      $set: {
        cmc_id: c.id,
        name: c.name,
        symbol: c.symbol,
        rank: parseInt(c.rank),
      }
    }, {
      upsert: true
    })
  }

  const afterLength = await List.count({})

  // Also refresh asset ids
  const assets_length = await refreshAssetIds()

  send(res, 200, {
    success: true,
    n_added: afterLength - beforeLength,
    assets_length,
  })
}

module.exports = refreshCoinLists
