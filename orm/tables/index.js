const users = require('./users')
const accounts = require('./accounts')
const cards = require('./cards')
const transactionsExtra = require('./transactions_extra')
const transactions = require('./transactions')
const userContacts = require('./users_contacts')

module.exports = function loadTables (orm) {
  users(orm)
  accounts(orm)
  cards(orm)
  transactionsExtra(orm)
  transactions(orm)
  userContacts(orm)
}
