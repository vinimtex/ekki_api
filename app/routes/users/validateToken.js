const jwt = require('jsonwebtoken')

const config = require('../../../configs/app')

module.exports = function (req, res, next) {
  let token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

    let urlUuid = req.baseUrl.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)[0]

    if (decoded.id !== urlUuid) res.status(401).send('Unauthorized')

    req.userId = decoded.id

    next()
  })
}
