const { send } = require('micro')
const fetch = require('node-fetch')
const List = require('../../models/List')

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
      }
    }, {
      upsert: true
    })
  }

  const afterLength = await List.count({})

  send(res, 200, {
    success: true,
    n_added: afterLength - beforeLength,
  })
}

module.exports = refreshCoinLists
