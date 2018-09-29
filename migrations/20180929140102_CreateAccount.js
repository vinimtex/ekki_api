function up (knex) {
  return knex.schema.createTable('accounts', function (table) {
    table.uuid('id').primary()

    table.uuid('user_id')
    table.foreign('user_id').references('users.id').onDelete('cascade')

    table.string('number').unique()
    table.decimal('balance', 15, 2)

    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.table('accounts', function (table) {
    table.dropForeign('user_id')
  }).then(() => {
    return knex.schema.dropTable('accounts')
  })
}

module.exports = { up, down }
