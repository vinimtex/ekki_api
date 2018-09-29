function up (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary()
    table.string('name')
    table.string('email').unique()
    table.string('password')
    table.string('document_type')
    table.string('document_number')
    table.unique(['document_type', 'document_number'])
    table.date('birth')
    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.dropTable('users')
}

module.exports = { up, down }
