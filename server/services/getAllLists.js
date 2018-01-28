const { send } = require('micro')
const List = require('../models/List')

const getAllLists = async (req, res) => {
  const data = await List.find({}, {
    submitted_definitions: 0,
    tags: 0,
    _id: 0,
    __v: 0
  })
  send(res, 200, {
    all_lists: data
  })
}

module.exports = getAllLists
