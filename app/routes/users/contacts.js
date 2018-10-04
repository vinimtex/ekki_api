const app = module.exports = require('express')()
const errors = require('throw.js')
const { uuidRegex } = require('../../util')
const {
  addContact,
  getContacts,
  getContact,
  removeContact
} = require('../../actions').contacts

app.post('/', (req, res, next) => {
  addContact(req.userId, req.body.contactId).then((contact) => {
    res.send(contact)
  }).catch((err) => {
    next(new errors.CustomError('Failed to add contact to your contact list', err, 500))
  })
})

app.get('/', (req, res, next) => {
  getContacts(req.userId).then((result) => {
    res.send(result.contacts)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve your contacts', err, 500))
  })
})

app.get(uuidRegex, function (req, res, next) {
  let contactId = getId(req.originalUrl)
  getContact(req.userId, contactId).then((contact) => {
    res.send(contact)
  }).catch((err) => {
    next(new errors.CustomError('Failed to retrieve the contact', err, 500))
  })
})

app.delete(uuidRegex, function (req, res, next) {
  let contactId = getId(req.originalUrl)
  removeContact(req.userId, contactId).then(() => {
    res.send('Contact removed with success')
  }).catch((err) => {
    next(new errors.CustomError('Failed to remove from contact list', err, 500))
  })
})

function getId (url) {
  return url.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g)[1]
}
