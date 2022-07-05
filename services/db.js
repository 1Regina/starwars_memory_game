'use strict'

const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./mydb.sqlite"
  },
  useNullAsDefault: true
})

module.exports = knex