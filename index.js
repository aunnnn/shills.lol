const { router, get, post } = require('microrouter')
const cors = require('micro-cors')()

const connectDB = require('./server/core/connectDB')
const safe = require('./server/core/safeMethod')

// Services
const hello = require('./server/services/hello')
const getAllLists = require('./server/services/getAllLists')
const getIntroLists = require('./server/services/getIntroLists')
const addDefinition = require('./server/services/addDefinition')
const voteDefinition = require('./server/services/voteDefinition')
const getList = require('./server/services/getList')

// Admin Services
const refreshCoinLists = require('./server/services/admin/refreshCoinLists')

connectDB()

const serviceStatus = (req, res) => {
  send(res, 200, {
    status: 'Up and running!',
  })
}

const server = router(
  safe(get)('/', () => "hello!"),
  safe(get)('/hello', hello),
  safe(get)('/lists', getAllLists),
  safe(get)('/lists/:symbol', getList),
  safe(get)('/intro_lists', getIntroLists),
  safe(post)('/definitions', addDefinition),
  safe(post)('/vote', voteDefinition),

  // Admin
  safe(get)('/_refreshCoinLists', refreshCoinLists)
)

module.exports = cors(server)
