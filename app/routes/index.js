const errors = require('throw.js')
const app = module.exports = require('express')()

app.get('/', (req, res) => {
  res.send('/')
})

app.all('*', (req, res, next) => {
  next(errors.NotFound())
})
