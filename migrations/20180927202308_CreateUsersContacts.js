function up (knex) {
  return knex.schema.createTable('users_contacts', function (table) {
    table.increments()

    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')

    table.integer('contact_id').unsigned()
    table.foreign('contact_id').references('users.id')

    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.table('users_contacts', function (table) {
    table.dropForeign('user_id')
    table.dropForeign('contact_id')
  }).then(() => {
    return knex.schema.dropTable('users_contacts')
  })
}

module.exports = { up, down }
