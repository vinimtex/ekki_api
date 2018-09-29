const users = require('./users')

module.exports = function loadTables (orm) {
  users(orm)
}
