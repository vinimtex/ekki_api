function up (knex) {
  return knex.schema.createTable('cards', function (table) {
    table.uuid('id').primary()
    table.uuid('user_id')
    table.foreign('user_id').references('users.id').onDelete('cascade')
    table.string('card_hash')
    table.integer('expiration_month')
    table.integer('expiration_year')
    table.integer('first_six_digits')
    table.integer('last_four_digits')
    table.string('ccv_hash')
    table.string('issuer')
    table.string('card_holder')
    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.table('cards', function (table) {
    table.dropForeign('user_id')
  }).then(function () {
    return knex.schema.dropTable('cards')
  })
}

module.exports = { up, down }
