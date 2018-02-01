const { send } = require('micro')
const List = require('../models/List')

const getIntroLists = async (req, res) => {
  const data = await List.find({ 
    rank: {
      $lt: 20
    }
  })
  .populate({ 
    path: 'submitted_definitions', 
    model: 'Definition',
    options: {
      limit: 1,
      sort: { upvotes: -1 }
    }
  })
  .exec()

  send(res, 200, {
    intro_lists: data
  })
}

module.exports = getIntroLists
