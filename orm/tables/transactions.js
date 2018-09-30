module.exports = function (orm) {
  orm.defineTable({
    name: 'transactions',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      extra_detail () {
        return this.hasOne('transactions_extra', 'extra_detail_id')
      }
    }
  })
}
