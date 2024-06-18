import { CreatePacient, Pacient, PacientId, PacientWithId } from '@/utils/models/pacient'
import { PacientsRepository } from '../pacients-repository'
import { client } from '@/lib/mongodb'
import { Collection, ObjectId } from 'mongodb'
import { User } from '@/utils/models/user'
import { UsersRepository } from '../users-repository'

export class MongoDBPacientRepository implements PacientsRepository {
  private pacientsCollection: Collection<Pacient>

  constructor(private usersRepository: UsersRepository) {
    this.pacientsCollection = client.db().collection<Pacient>('pacients')
  }

  async findAll(): Promise<(User & object)[] | null> {
    try {
      const pacients = await this.pacientsCollection.find().toArray()

      const usersPromises = pacients.map((pacient) => this.usersRepository.findById(pacient.userId))
      const users = await Promise.all(usersPromises)

      return users.filter((user) => user !== null) as (User & object)[]
    } catch (err) {
      return null
    }
  }

  async findById(id: string): Promise<Pacient | null> {
    const pacient = await this.pacientsCollection.findOne({ _id: new ObjectId(id) })

    return pacient
  }

  async findByUserId(userId: string): Promise<PacientWithId | null> {
    try {
      const pacient = await this.pacientsCollection.findOne({ userId })

      return pacient
    } catch (err) {
      return null
    }
  }

  async create(data: CreatePacient): Promise<PacientId | null> {
    const pacient = await this.pacientsCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    if (pacient.acknowledged) {
      return {
        id: pacient.insertedId.toString(),
      }
    }

    return null
  }

  async delete(userId: string): Promise<boolean | null> {
    try {
      const pacient = await this.pacientsCollection.deleteOne({
        userId,
      })

      if (pacient.acknowledged) {
        if (pacient.deletedCount > 0) {
          return true
        }
      }

      return false
    } catch (err) {
      return null
    }
  }

  async getPacientName(id: string): Promise<string | null> {
    const pacient = await this.findById(id)

    if (!pacient) {
      return null
    }

    const user = await this.usersRepository.findById(pacient.userId)

    if (user) {
      return user.name
    }

    return null
  }
}
