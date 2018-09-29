const app = module.exports = require('express')()
const errors = require('throw.js')
const {
  createUser
} = require('../../actions').users

app.post('/', (req, res, next) => {
  createUser(req.body).then((user) => {
    res.send(user)
  }).catch((err) => {
    next(new errors.CustomError('Failed to create user', err, 500))
  })
})

app.get('/', (req, res) => {
  res.send('stee')
})
