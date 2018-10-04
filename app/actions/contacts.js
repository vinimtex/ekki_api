const { table } = require('../../orm')

function addContact (userId, contactId) {
  return table('users_contacts').insert({
    user_id: userId,
    contact_id: contactId
  })
}

function getContacts (userId) {
  return table('users').eagerLoad({ contacts: (t) => {
    t.eagerLoad('accounts')
  } }).find(userId)
}

function getContact (userId, contactId) {
  return table('users_contacts').where({
    user_id: userId,
    contact_id: contactId
  }).join('users', 'users_contacts.contact_id', '=', 'users.id').first()
}

function removeContact (userId, contactId) {
  return table('users_contacts').where({
    user_id: userId,
    contact_id: contactId
  }).delete()
}

module.exports = {
  addContact,
  getContacts,
  getContact,
  removeContact
}
