const { json, send } = require('micro')
const Definition = require('../models/Definition')

const addDefinition = async (req, res) => {
  const body = await json(req)
  const definition = new Definition({
    text: String,
    upvotes: 0,
    downvotes: 0
  })
  const savedDefinition = await definition.save()
  send(res, 200, {
    definition: savedDefinition
  })
}

module.exports = addDefinition
