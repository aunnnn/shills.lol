const { json, send } = require('micro')
const Definition = require('../models/Definition')

const voteDefinition = async (req, res) => {
  const body = await json(req)
  
  const def_id = body.def_id
  const vote_type = body.vote_type

  var updateCommand;
  if (vote_type === 'up') {
    updateCommand = {
      $inc: {
        upvotes: 1
      }
    }
  } else if (vote_type === 'down') {
    updateCommand = {
      $inc: {
        downvotes: 1
      }
    }
  } else {
    throw new Error("vote_type must either be 'up' or 'down'")
  }

  const result = await Definition.update({ _id: def_id }, updateCommand)
  send(res, 200, {
    definition: result
  })
}

module.exports = voteDefinition
