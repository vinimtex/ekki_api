const { table } = require('../../orm')
const bcrypt = require('bcrypt-nodejs')
const config = require('../../configs/app')
const jwt = require('jsonwebtoken')
const {
  openAccount
} = require('./accounts')

function createUser (data = {}) {
  let hashedPassword = bcrypt.hashSync(data.password)
  data.password = hashedPassword
  return table('users').insert(data).then((user) => {
    return openAccount(user.id)
  })
}

function userAuthorization (data = {}) {
  return table('users').where({ email: data.email }).first().then((user) => {
    let validPassword = bcrypt.compareSync(data.password, user.password)
    if (validPassword) {
      let token = jwt.sign({ id: user.id }, config.jwtSecret)
      user.token = token
      return user
    } else {
      return false
    }
  })
}

function checkPassword (data) {
  return table('users').find(data.id).then((user) => {
    return bcrypt.compare(data.password, user.password).then((err, result) => {
      if (err) {
        return false
      }
      if (result) {
        return true
      } else {
        return false
      }
    })
  })
}

function findUser (id = {}) {
  return table('users').select('name', 'email', 'document_type', 'document_number', 'birth', 'created_at', 'updated_at').find(id)
}

function updateUser (userId, data = {}) {
  return table('users').update(userId, data)
}

function deleteUser (userId) {
  return table('users').delete(userId)
}

module.exports = {
  createUser,
  userAuthorization,
  findUser,
  updateUser,
  deleteUser,
  checkPassword
}
