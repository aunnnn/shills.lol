const { send } = require('micro')
const List = require('../models/List')

const getAllLists = async (req, res) => {
  const data = await List.find({})  
  send(res, 200, {
    allLists: data
  })
}

module.exports = getAllLists
