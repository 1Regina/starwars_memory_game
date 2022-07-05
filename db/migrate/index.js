const knex = require('../../services/db')

async function doMigrate(migrateName) {
  const { up, down } = require('./' + migrateName)
  try {
    // await down(knex)
  } catch (e) {
    console.log('down', migrateName, e.toString())
  }
  try {
    await up(knex)
  } catch (e) {
    console.log('up', migrateName, e.toString())
  }
}

async function run() {
  try {
     await doMigrate('20220628001_create_users')
     await doMigrate('22020701001_fix_users')
    process.exit(0)
  } catch (e) {
    console.log(e.toString())
    process.exit(1)
  }
}

run()