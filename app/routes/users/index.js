const app = module.exports = require('express')()
const errors = require('throw.js')
const { uuidRegex } = require('../../util')
const {
  createUser,
  userAuthorization
} = require('../../actions').users

app.post('/', (req, res, next) => {
  createUser(req.body).then((user) => {
    res.send(user)
  }).catch((err) => {
    next(new errors.CustomError('Failed to create user', err, 500))
  })
})

app.post('/login', (req, res, next) => {
  userAuthorization(req.body).then((result) => {
    res.send(result)
  }).catch((err) => {
    next(new errors.CustomError('Wrong e-mail or password', err, 403))
  })
})

app.use(uuidRegex, require('./user')) // /user/{uuId} endpoint
