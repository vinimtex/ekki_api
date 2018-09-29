const Tabel = require('tabel')
const config = require('../configs/database')

const loadTables = require('./tables')

const orm = new Tabel(config)

loadTables(orm)

module.exports = orm.exports
