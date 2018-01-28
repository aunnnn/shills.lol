const { router, get, post } = require('microrouter')
const connectDB = require('./server/utils/connectDB')
const safe = require('./server/utils/safeMethod')

// Services
const hello = require('./server/services/hello')
const getAllLists = require('./server/services/getAllLists')
const getIntroLists = require('./server/services/getIntroLists')
const addDefinition = require('./server/services/addDefinition')
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
  safe(get)('/intro_lists', getIntroLists),
  safe(post)('/definitions', addDefinition),

  // Admin
  safe(get)('/_refreshCoinLists', refreshCoinLists)
)

module.exports = server
