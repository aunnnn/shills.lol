const { send } = require('micro')
const fetch = require('node-fetch')

const List = require('../models/List')

// Proxy to get latest coin price, and other info, etc from cmc
const getLatestCoinStatus = async (req, res) => {
  const cmc_id = req.params.cmcid
  const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/${cmc_id}/`)
  const c = (await response.json())[0]
  const list = (await List.findOne({ cmc_id  }))
  const shillsInfo = {
    cmc_id: c.id,
    name: c.name,
    symbol: c.symbol,
    rank: parseInt(c.rank),
    price_usd: c.price_usd,
    price_btc: c.price_btc,
    market_cap_usd: c.market_cap_usd,
    percent_change_1h: c.percent_change_1h,
    percent_change_24h: c.percent_change_24h,
    percent_change_7d: c.percent_change_7d,
    cmc_last_updated: c.last_updated,
    cmc_url: `https://coinmarketcap.com/currencies/${c.id}/`,
    cmc_icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${list.cmc_asset_id}.png`,
  }

  send(res, 200, {
    success: true,
    status: shillsInfo,
  })
}

module.exports = getLatestCoinStatus
