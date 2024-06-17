import { env } from '@/env'
import { MongoClient } from 'mongodb'

export const client = new MongoClient(env.DATABASE_URL)

export async function connect() {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export async function close() {
  try {
    await client.close()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
  }
}
