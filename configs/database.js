module.exports = {
  db: {
    client: 'postgresql',
    connection: {
      database: 'ekki_api',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: 'knex_migration'
  }
}
