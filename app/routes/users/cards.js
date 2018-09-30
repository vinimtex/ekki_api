const app = module.exports = require('express')()
const errors = require('throw.js')
const { uuidRegex } = require('../../util')
const {
  createCard,
  updateCard,
  deleteCard,
  getUserCards,
  findCardById
} = require('../../actions').cards

app.post('/', (req, res, next) => {
  req.body.user_id = req.userId
  createCard(req.body).then((card) => {
    res.send(card)
  }).catch((err) => {
    next(new errors.CustomError('Failed to save your card', err, 500))
  })
})

app.get('/', (req, res, next) => {
  getUserCards(req.userId).then((cards) => {
    res.send(cards)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve your cards', err, 500))
  })
})

app.get(uuidRegex, function (req, res, next) {
  let cardId = getId(req.originalUrl)
  findCardById(cardId).then((card) => {
    res.send(card)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve your card', err, 500))
  })
})

app.post(uuidRegex, function (req, res, next) {
  let cardId = getId(req.originalUrl)
  updateCard(cardId, req.body).then((card) => {
    res.send(card)
  }).catch((err) => {
    next(new errors.CustomError('Failed to update your card', err, 500))
  })
})

app.delete(uuidRegex, function (req, res, next) {
  let cardId = getId(req.originalUrl)
  deleteCard(cardId).then(() => {
    res.send('Card deleted with success')
  }).catch((err) => {
    next(new errors.CustomError('Failed to update your card', err, 500))
  })
})

function getId (url) {
  return url.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g)[1]
}
