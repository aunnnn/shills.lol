const { json, send } = require('micro')
const Definition = require('../models/Definition')

const voteDefinition = async (req, res) => {
  const body = await json(req)
  
  const def_id = body.def_id
  const vote_type = body.vote_type
  const vote_amount = body.vote_amount || 1

  var updateCommand;
  
  if (vote_amount > 20) {
    throw new Error("Don't you think that's too much votes?")
  }

  if (vote_type === 'up') {
    updateCommand = {
      $inc: {
        upvotes: vote_amount
      }
    }
  } else if (vote_type === 'down') {
    updateCommand = {
      $inc: {
        downvotes: vote_amount
      }
    }
  } else {
    throw new Error("vote_type must either be 'up' or 'down'")
  }

  const result = await Definition.update({ _id: def_id }, updateCommand)
  send(res, 200, {
    result
  })
}

module.exports = voteDefinition
