const users = require('./users')
const accounts = require('./accounts')

module.exports = function loadTables (orm) {
  users(orm)
  accounts(orm)
}
