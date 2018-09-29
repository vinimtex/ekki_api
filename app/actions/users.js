const { table } = require('../../orm')
const bcrypt = require('bcrypt')
const config = require('../../configs/app')

function createUser (data = {}) {
  return bcrypt.hash(data.password, config.bcryptSaltRounds).then((hashedPassword) => {
    data.password = hashedPassword
    return table('users').insert(data)
  }).catch((err) => {
    console.log(err)
    return Promise.reject(err)
  })
}

module.exports = {
  createUser
}
