const cluster = require('express-cluster')
const express = require('express')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const cors = require('cors')

const config = require('../configs/app')

const { handleAsyncExceptions } = require('./util')
const routes = require('./routes')

function run () {
  const app = express()
  app.set('root', `${__dirname}/..`)

  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(bodyParser.json())

  app.use(cors())

  switch (process.env.NODE_ENV) {
    case 'production':
      app.set('trust proxy', 'loopback')

      app.use(cors())

      app.set('baseUrl', config.baseUrl)

      app.use(routes)

      cluster((worker) => app.listen(config.server.port, config.server.host, () => {
        console.log(`worker ${worker.id} online`)
      }))
      break
    default:
      app.use(cors())

      app.use(errorhandler())

      app.set('baseUrl', config.baseUrl)

      app.use(routes)

      app.listen(config.server.port, config.server.host, () => {
        console.log(`Ekki api running on http://${config.server.host}:${config.server.port}`)
      })

      break
  }
}

module.exports = run

if (require.main === module) {
  handleAsyncExceptions()
  run()
}
