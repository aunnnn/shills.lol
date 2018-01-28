const { send } = require('micro')

const hello = async (req, res) => {
  send(res, 200, {
    hello: 'Hello world'
  })
}

module.exports = hello
