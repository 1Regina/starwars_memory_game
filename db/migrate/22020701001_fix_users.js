exports.up = async (knex) => {
  await knex.schema.alterTable('users', table => {
    // table.increments('id').primary()
    table.unique('username')
    // table.string('password')
    table.integer('fastestTime').defaultTo(0)
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}

