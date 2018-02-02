const { json, send } = require('micro')
const Definition = require('../models/Definition')
const List = require('../models/List')

const addDefinition = async (req, res) => {
  const body = await json(req)
  
  const list = await List.findOne({ _id: body.list_id })
  if (!list) { throw Error("No list with given id found.") }

  const definition = new Definition({
    list_id: list._id,
    text: body.text,
    upvotes: 0,
    downvotes: 0
  })
  
  const savedDefinition = await definition.save()
  
  list.submitted_definitions.push(savedDefinition._id)
  await list.save()

  send(res, 200, {
    definition: savedDefinition,
    symbol: list.symbol,
  })
}

module.exports = addDefinition
