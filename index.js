const { router, get, post } = require('microrouter')
const connectDB = require('./server/utils/connectDB')
const safe = require('./server/utils/safeMethod')

// Services
const hello = require('./server/services/hello')
const getAllLists = require('./server/services/getAllLists')
const addDefinition = require('./server/services/addDefinition')

connectDB()

const serviceStatus = (req, res) => {
  send(res, 200, {
    status: 'Up and running!',
  })
}

const server = router(
  safe(get)('/hello', hello),
  safe(get)('/lists', getAllLists),
  safe(post)('/definitions', addDefinition)
)

module.exports = server
