const { table } = require('../../orm')

function createTransaction (data = {}) {
  return table('transactions').insert(data)
}

module.exports = {
  createTransaction
}
