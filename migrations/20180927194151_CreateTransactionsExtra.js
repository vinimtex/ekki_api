function up (knex) {
  return knex.schema.createTable('transactions_extra', function (table) {
    table.increments()
    table.decimal('balance_amount', 15, 2)
    table.decimal('credit_card_amount', 15, 2)
    table.integer('cc_expiration_month')
    table.integer('cc_expiration_year')
    table.integer('cc_first_six_digits')
    table.integer('cc_last_four_digits')
    table.integer('cc_security_code_size')
    table.string('cc_security_code_length')
    table.string('cc_issuer')
    table.string('cc_card_holder')

    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.dropTable('transactions_extra')
}

module.exports = { up, down }
