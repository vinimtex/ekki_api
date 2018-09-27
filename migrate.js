const migrate = require('tabel/lib/migrate')
const ormConfig = require('./configs/database')

migrate(ormConfig)
