const knex = require('../../services/db')

async function doSeed(seedName) {
  const { seed } = require('./' + seedName)
  await seed(knex)
}

async function run() {
  try {
    await doSeed('seed_users')
     process.exit(0)
  } catch (e) {
    console.log(e.toString())
    process.exit(1)
  }
}

run()
