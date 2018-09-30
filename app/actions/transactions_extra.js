const { table } = require('../../orm')

function createTransactionExtra (data = {}) {
  return table('transactions_extra').insert(data)
}

module.exports = {
  createTransactionExtra
}
