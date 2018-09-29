module.exports = function (orm) {
  orm.defineTable({
    name: 'users',

    props: {
      autoId: true,
      timestamps: true
    },

    relations: {
      //
    }
  })
}
