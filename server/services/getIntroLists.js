const { send } = require('micro')
const List = require('../models/List')

const getIntroLists = async (req, res) => {
  const lists = await List
    .aggregate()
    .match({
      rank: {
        $lt: 100
      }
    })
    .project({
      cmc_url: {
        $concat: [ 'https://coinmarketcap.com/currencies/', '$cmc_id', '/']
      },
      cmc_icon: {
        $concat: [ 'https://s2.coinmarketcap.com/static/img/coins/64x64/', '$cmc_asset_id', '.png']
      },
      name: 1,
      symbol: 1,
      rank: 1,
      definitions_count: 1,
      latest_definition_added: 1,
      cmc_id: 1,
      submitted_definitions: 1,
    })

  const data = await List.populate(lists, {
    path: 'submitted_definitions',
    model: 'Definition',
    options: {
      limit: 1,
      sort: { upvotes: -1 }
    }
  })

  send(res, 200, {
    intro_lists: data
  })
}

module.exports = getIntroLists
