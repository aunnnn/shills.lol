const { send } = require('micro')
const List = require('../models/List')

const getList = async (req, res) => {
  const symbol = req.params.symbol
  const data = await List.findOne({ symbol }).populate({ 
    path: 'submitted_definitions', 
    model: 'Definition',
    // options: {
    //   sort: { created_at: -1 }
    // }
  })
  send(res, 200, {
    list: data
  })
}

module.exports = getList
