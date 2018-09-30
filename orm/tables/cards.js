module.exports = function (orm) {
  orm.defineTable({
    name: 'cards',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      user () {
        return this.belongsTo('users', 'user_id')
      }
    }
  })
}
