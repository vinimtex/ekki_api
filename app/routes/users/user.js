const app = module.exports = require('express')()
const errors = require('throw.js')

const {
  findUser,
  updateUser,
  deleteUser,
  checkPassword
} = require('../../actions').users

const {
  findAccountByUserId,
  transfer,
  deposit
} = require('../../actions').accounts

const {
  getTransactions
} = require('../../actions').transactions

app.all('*', require('./validateToken'))

app.get('/', (req, res, next) => {
  findUser(req.userId).then((user) => {
    res.send(user)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve user', err, 500))
  })
})

app.post('/', (req, res, next) => {
  updateUser(req.userId, req.body).then((user) => {
    res.send(user)
  }).catch((err) => {
    next(new errors.CustomError('Failed to update', err, 500))
  })
})

app.delete('/', (req, res, next) => {
  deleteUser(req.userId).then((result) => {
    res.send('User deleted')
  }).catch((err) => {
    next(new errors.CustomError('Failed to delete', err, 500))
  })
})

app.use('/cards', require('./cards'))
app.use('/contacts', require('./contacts'))

app.get('/account', (req, res, next) => {
  findAccountByUserId(req.userId).then((account) => {
    res.send(account)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve your account', err, 500))
  })
})

app.post('/account/deposit', (req, res, next) => {
  deposit(req.body).then((transaction) => {
    res.send(transaction)
  }).catch((err) => {
    next(new errors.CustomError('Failed to deposit', err, 500))
  })
})

app.post('/account/transfer', (req, res, next) => {
  if (req.body.total_amount > 1000) {
    checkPassword({
      id: req.userId,
      password: req.body.password
    }).then((validPassword) => {
      if (validPassword) {
        findAccountByUserId(req.userId).then((account) => {
          transfer(account.number, req.body.account_number, req.body).then((transfer) => {
            if (transfer) {
              res.send(transfer)
            } else {
              next(new errors.CustomError('Duplicated transfer', 'Duplicated transfer', 500))
            }
          }).catch((err) => {
            next(new errors.CustomError('Failed to transfer', err, 500))
          })
        }).catch((err) => {
          next(new errors.CustomError('Failed to retrieve your account', err, 500))
        })
      } else {
        next(new errors.CustomError('Wrong password', 'Wrong Password', 401))
      }
    })
  } else {
    // @TODO: remover repetição de código
    findAccountByUserId(req.userId).then((account) => {
      transfer(account.number, req.body.account_number, req.body).then((transfer) => {
        if (transfer) {
          res.send(transfer)
        } else {
          next(new errors.CustomError('Duplicated transfer', 'Duplicated transfer', 500))
        }
      }).catch((err) => {
        next(new errors.CustomError('Failed to transfer', err, 500))
      })
    }).catch((err) => {
      next(new errors.CustomError('Failed to retrieve your account', err, 500))
    })
    // @ENDTODO
  }
})

app.get('/transactions', (req, res, next) => {
  getTransactions(req.userId).then((transactions) => {
    res.send(transactions)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve your transactions history', err, 500))
  })
})
