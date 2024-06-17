import { CreatePacient, Pacient, PacientId } from '@/utils/models/pacient'
import { PacientsRepository } from '../pacients-repository'
import { client } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export class MongoDBPacientRepository implements PacientsRepository {
  private pacientsCollection

  constructor() {
    this.pacientsCollection = client.db().collection<Pacient>('pacients')
  }

  async findAll(): Promise<Pacient[] | null> {
    try {
      return await this.pacientsCollection.find().toArray()
    } catch (err) {
      return null
    }
  }

  async findById(id: string): Promise<Pacient | null> {
    const pacient = await this.pacientsCollection.findOne({ _id: new ObjectId(id) })

    return pacient
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
}
