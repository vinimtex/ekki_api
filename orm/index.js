const Tabel = require('tabel')
const config = require('../configs/database')

const orm = new Tabel(config)

require('./tables')(orm)

module.exports = orm.exports
