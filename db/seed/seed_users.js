exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {
    await knex('users').del()
  } catch (e) {
    console.log(e.toString())    
  }

  await knex('users').insert([
    {
      id: 1,
      username: 'aaa',
      password: '$2b$12$Rr1kYTVjZ.9Mnz8EpvRHk.EccoXNtt574A5mwvDn97S5Gu2xIMFhO',
    },
    {
      id: 2,
      username: 'bbb',
      password: '$2b$12$Rr1kYTVjZ.9Mnz8EpvRHk.EccoXNtt574A5mwvDn97S5Gu2xIMFhO',
    }
  ])
}
