module.exports = {
  db: {
    client: 'postgresql',
    connection: {
      database: 'd6jnd5h1rm5cho',
      host: 'ec2-184-73-201-79.compute-1.amazonaws.com',
      port: 5432,
      user: 'qlfsccieteebma',
      password: '6f074ccd10b0d76ee48e879a012b5cda7ada62b5e534010981383c52b9d6f443'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: 'knex_migration'
  }
}
