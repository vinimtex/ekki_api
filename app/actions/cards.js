const { table } = require('../../orm')
const bcrypt = require('bcrypt')

const config = require('../../configs/app')

function createCard (data = {}) {
  return bcrypt.hash(data.card_number, config.bcryptSaltRounds).then((hashCardNumber) => {
    return bcrypt.hash(data.ccv, config.bcryptSaltRounds).then((ccvHash) => {
      data.card_hash = hashCardNumber
      data.first_six_digits = data.card_number.substring(0, 6)
      data.last_four_digits = data.card_number.substring(data.card_number.length - 4, data.card_number.length)
      data.ccv_hash = ccvHash
      return table('cards').insert(data)
    })
  }).catch((err) => {
    return Promise.reject(err)
  })
}

function updateCard (cardId, data = {}) {
  return bcrypt.hash(data.card_number, config.bcryptSaltRounds).then((hashCardNumber) => {
    return bcrypt.hash(data.ccv, config.bcryptSaltRounds).then((ccvHash) => {
      data.card_hash = hashCardNumber
      data.first_six_digits = data.card_number.substring(0, 6)
      data.last_four_digits = data.card_number.substring(data.card_number.length - 4, data.card_number.length)
      data.ccv_hash = ccvHash
      return table('cards').update(cardId, data)
    })
  }).catch((err) => {
    return Promise.reject(err)
  })
}

function getUserCards (userId) {
  return table('cards').where({ user_id: userId }).all()
}

function findCardById (cardId) {
  return table('cards').find(cardId)
}

function deleteCard (cardId) {
  return table('cards').delete(cardId)
}

module.exports = {
  createCard,
  updateCard,
  getUserCards,
  findCardById,
  deleteCard
}
