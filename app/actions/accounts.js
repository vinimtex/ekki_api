const { table } = require('../../orm')
const {
  createTransaction
} = require('./transactions')

const {
  createTransactionExtra
} = require('./transactions_extra')

const {
  findCardById
} = require('./cards')

const {
  addContact
} = require('./contacts')

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

function transfer (fromAccountNumber, toAccountNumber, data) {
  let duplicated = false
  return table('accounts').eagerLoad('user').where({ number: fromAccountNumber }).first().then((fromAccount) => {
    return table('accounts').eagerLoad('user').where({ number: toAccountNumber }).first().then((toAccount) => {
      return table('transactions')
        .orderBy('created_at', 'desc')
        .where('sender_document_number', '=', fromAccount.user.document_number)
        .first()
        .then((lastTransaction) => {
          if (lastTransaction) {
            let now = new Date()
            let transactionDate = new Date(lastTransaction.created_at)

            var ms = (now - transactionDate)
            var minutes = Math.round(((ms % 86400000) % 3600000) / 60000)
            console.log({
              ms: ms,
              minutos: minutes,
              lastTransaction
            })
            if (parseFloat(lastTransaction.total_amount) === parseFloat(data.total_amount) && minutes < 2 && lastTransaction.destination_document_number === toAccount.user.document_number) {
              duplicated = true
              console.log('entrou')
              table('transactions').update(lastTransaction.id, { status: 'canceled' })
              // let refundSenderValue = parseFloat(fromAccount.balance) + parseFloat(lastTransaction.total_amount)
              // let discountDestinationValue = parseFloat(toAccount.balance) - parseFloat(lastTransaction.total_amount)
              // table('accounts').update(fromAccount.id, { balance: refundSenderValue })
              // table('accounts').update(toAccount.id, { balance: discountDestinationValue })
              return false
            }
          }

          let newFromAccountBalance
          if (data.card_id) {
            newFromAccountBalance = parseFloat(fromAccount.balance) - parseFloat(data.balance_amount)
          } else {
            newFromAccountBalance = parseFloat(fromAccount.balance) - parseFloat(data.total_amount)
          }

          let newToAccountBalance = parseFloat(toAccount.balance) + parseFloat(data.total_amount)

          data.status = 'approved'
          data.destination_account_number = toAccount.number
          data.destination_holder_name = toAccount.user.name
          data.destination_document_number = toAccount.user.document_number
          data.sender_account_number = fromAccount.number
          data.sender_holder_name = fromAccount.user.name
          data.sender_document_number = fromAccount.user.document_number

          if (data.save_contact) {
            addContact(fromAccount.user.id, toAccount.user.id)
          }

          if (toAccount && fromAccount) {
            if ((parseFloat(data.total_amount) <= parseFloat(fromAccount.balance)) && data.card_id === undefined) {
              if (!duplicated) {
                table('accounts').update(toAccount.id, { balance: newToAccountBalance })
                table('accounts').update(fromAccount.id, { balance: newFromAccountBalance })
              }
              return createTransaction(data)
            } else if ((parseFloat(data.total_amount) > parseFloat(fromAccount.balance)) && data.card_id !== undefined) {
              if (data.card_id && data.credit_card_amount > 0) {
                return findCardById(data.card_id).then((card) => {
                  let extraData = {
                    balance_amount: data.balance_amount,
                    credit_card_amount: data.credit_card_amount,
                    cc_expiration_month: card.expiration_month,
                    cc_expiration_year: card.expiration_year,
                    cc_first_six_digits: card.first_six_digits,
                    cc_last_four_digits: card.last_four_digits,
                    cc_security_code_size: card.security_code_size,
                    cc_security_code_length: card.security_code_length,
                    cc_issuer: card.issuer,
                    cc_card_holder: card.card_holder
                  }

                  return createTransactionExtra(extraData).then((extra) => {
                    data.extra_detail_id = extra.id
                    if (!duplicated) {
                      table('accounts').update(toAccount.id, { balance: newToAccountBalance })
                      table('accounts').update(fromAccount.id, { balance: newFromAccountBalance })
                    }
                    return createTransaction(data)
                  })
                })
              } else {
                return { message: 'Total do cartão de crédito inválido' }
              }
            } else {
              return { message: 'Saldo insuficiente', missing_value: fromAccount.balance - data.total_amount }
            }
          }
        })
    })   
  })
}

function deposit (data) {
  return table('accounts').eagerLoad('user').where({ number: data.account_number }).first().then((account) => {
    return findCardById(data.card_id).then((card) => {
      let extraData = {
        balance_amount: 0,
        credit_card_amount: data.amount,
        cc_expiration_month: card.expiration_month,
        cc_expiration_year: card.expiration_year,
        cc_first_six_digits: card.first_six_digits,
        cc_last_four_digits: card.last_four_digits,
        cc_security_code_size: card.security_code_size,
        cc_security_code_length: card.security_code_length,
        cc_issuer: card.issuer,
        cc_card_holder: card.card_holder
      }

      return createTransactionExtra(extraData).then((extra) => {
        data.extra_detail_id = extra.id
        data.status = 'approved'
        data.total_amount = data.amount
        data.destination_account_number = account.number
        data.destination_holder_name = account.user.name
        data.destination_document_number = account.user.document_number
        data.sender_account_number = account.number
        data.sender_holder_name = account.user.name
        data.sender_document_number = account.user.document_number
        table('accounts').update(account.id, { balance: data.amount })
        return createTransaction(data)
      })
    })
  })
}

function generateAccountNumber () {
  let accountNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)
  let accountDigit = Math.floor((Math.random() * 10) + 1)
  return accountNumber + '-' + accountDigit
}

module.exports = {
  openAccount,
  findAccountByUserId,
  transfer,
  deposit
}
