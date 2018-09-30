module.exports = function (orm) {
  orm.defineTable({
    name: 'transactions_extra',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      transaction () {
        return this.belongsTo('transactions', 'extra_detail_id')
      }
    }
  })
}
