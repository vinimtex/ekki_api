module.exports = function (orm) {
  orm.defineTable({
    name: 'users',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      accounts () {
        return this.hasMany('accounts', 'user_id')
      },
      cards () {
        return this.hasMany('cards', 'card_id')
      }
    }
  })
}
