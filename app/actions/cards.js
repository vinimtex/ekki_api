const { table } = require('../../orm')
const bcrypt = require('bcrypt-nodejs')

function createCard (data = {}) {
  let hashCardNumber = bcrypt.hashSync(data.card_number)
  let ccvHash = bcrypt.hashSync(data.card_number)

  data.card_hash = hashCardNumber
  data.first_six_digits = data.card_number.substring(0, 6)
  data.last_four_digits = data.card_number.substring(data.card_number.length - 4, data.card_number.length)
  data.ccv_hash = ccvHash

  return table('cards').insert(data)
}

function updateCard (cardId, data = {}) {
  let hashCardNumber = bcrypt.hashSync(data.card_number)
  let ccvHash = bcrypt.hashSync(data.card_number)
  data.card_hash = hashCardNumber
  data.first_six_digits = data.card_number.substring(0, 6)
  data.last_four_digits = data.card_number.substring(data.card_number.length - 4, data.card_number.length)
  data.ccv_hash = ccvHash
  return table('cards').update(cardId, data)
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
