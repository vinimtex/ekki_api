const { table } = require('../../orm')

function createTransaction (data = {}) {
  return table('transactions').insert(data)
}

function getTransactions (userId) {
  return table('users').eagerLoad('accounts').find(userId).then((user) => {
    return table('transactions').eagerLoad('extra_detail')
      .where({ sender_account_number: user.accounts[0].number })
      .orWhere({ destination_account_number: user.accounts[0].number }).orderBy('created_at', 'desc').all()
  })
}

module.exports = {
  createTransaction,
  getTransactions
}
