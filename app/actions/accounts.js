const { table } = require('../../orm')

function openAccount (userId) {
  let accountNumber = generateAccountNumber()

  table('accounts').where({ number: accountNumber }).first().then((account) => {
    if (account) {
      openAccount(userId)
    }
  })

  return table('accounts').insert({
    user_id: userId,
    number: accountNumber,
    balance: 0
  })
}

function findAccountByUserId (userId) {
  return table('accounts').where({ user_id: userId }).first()
}

function transfer (fromAccount, toAccount) {

}

function generateAccountNumber () {
  let accountNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)
  let accountDigit = Math.floor((Math.random() * 10) + 1)
  return accountNumber + '-' + accountDigit
}

module.exports = {
  openAccount,
  findAccountByUserId,
  transfer
}
