import 'dotenv/config'

import { Environment } from 'vitest'
import { MongoClient } from 'mongodb'
import { env } from '@/env'

const mongoClient = new MongoClient(env.DATABASE_URL_TEST)

async function createTestDatabase() {
  const databaseName = `test_db_${new Date().getTime()}`
  await mongoClient.db(databaseName).command({ ping: 1 })
  return databaseName
}

export default <Environment>{
  name: 'mongo',
  async setup() {
    await mongoClient.connect()
    const testDatabaseName = await createTestDatabase()

    process.env.DATABASE_URL_TEST = `${process.env.DATABASE_URL_TEST}/${testDatabaseName}`

    return {
      async teardown() {
        await mongoClient.db(testDatabaseName).dropDatabase()
        await mongoClient.close()
      },
    }
  },
}
