module.exports = function (orm) {
  orm.defineTable({
    name: 'users_contacts',

    props: {
      autoId: false,
      timestamps: true
    },

    relations: {
    }
  })
}
