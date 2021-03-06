const { send } = require('micro')
const List = require('../models/List')

const getAllLists = async (req, res) => {
  const limitN = req.query.limit
  const data = await List.find({}, {
    _id: 0,
    cmc_id: 1,
    name: 1,
    symbol: 1,
    rank: 1
  }).sort({ rank: 1 }).limit(parseInt(limitN))
  send(res, 200, {
    all_lists: data
  })
}

module.exports = getAllLists
