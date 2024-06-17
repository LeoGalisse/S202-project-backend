import { client } from '@/lib/mongodb'
import { UsersRepository } from '../users-repository'
import { CreateUser, User, UserId } from '@/utils/models/user'
import { Collection, ObjectId } from 'mongodb'

export class MongoDBUsersRepository implements UsersRepository {
  private usersCollection: Collection<User>

  constructor() {
    this.usersCollection = client.db().collection<User>('users')
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.usersCollection.findOne({ _id: new ObjectId(id) })

      return user
    } catch (error) {
      console.error('Error finding user by id:', error)
      throw error
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.usersCollection.findOne({ email })

      return user
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw error
    }
  }

  async create(data: CreateUser): Promise<UserId | null> {
    try {
      const result = await this.usersCollection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      if (result.acknowledged) {
        return {
          insertedId: result.insertedId.toString(),
        }
      }

      return null
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }
}
