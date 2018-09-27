function up (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.uuid('uuid')
    table.string('name')
    table.string('email')
    table.string('document_type')
    table.string('document_number')
    table.date('birth')
    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.dropTable('users')
}

module.exports = { up, down }
