const fetch = require('node-fetch')
const List = require('../../models/List')

const refreshCMCAssetIds = async () => {
  const response = await fetch('https://s2.coinmarketcap.com/generated/search/quick_search.json')
  const coins = await response.json()

  for (let c of coins) {    
    await List.updateOne({ cmc_id: c.slug }, {
      $set: {
        cmc_asset_id: c.id,
      }
    })
  }

  return coins.length
}

module.exports = refreshCMCAssetIds
