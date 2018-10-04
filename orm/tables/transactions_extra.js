module.exports = function (orm) {
  orm.defineTable({
    name: 'transactions_extra',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      transaction () {
        return this.hasOne('transactions', 'id')
      }
    }
  })
}
