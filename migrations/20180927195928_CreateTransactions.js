function up (knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.increments()

    table.integer('extra_detail_id').unsigned()
    table.foreign('extra_detail_id').references('transactions_extra.id').onDelete('set null')

    table.uuid('uuid')
    table.decimal('total_amount', 15, 2)
    table.string('status')
    table.string('destination_account_number')
    table.string('destination_holder_name')
    table.string('destination_document_number')
    table.string('sender_account_number')
    table.string('sender_holder_name')
    table.string('sender_document_number')
    table.string('payment_method')

    table.timestamps()
  })
}

function down (knex) {
  return knex.schema.table('transactions', function (table) {
    table.dropForeign('extra_detail_id')
  }).then(() => {
    return knex.schema.dropTable('transactions')
  })
}

module.exports = { up, down }
