const { router, get } = require('microrouter')
const connectDB = require('./server/utils/connectDB')
const hello = require('./server/services/hello')
const safe = require('./server/utils/safeMethod')

connectDB()

const serviceStatus = (req, res) => {
  send(res, 200, {
    status: 'Up and running!',
  })
}

const handler = router(
  safe(get)('/hello', hello)
)

module.exports = handler
