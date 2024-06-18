import { client } from '@/lib/mongodb'
import { MedicRepository } from '../medic-repository'
import { Collection, ObjectId } from 'mongodb'
import { CreateMedic, Medic, MedicId, UpdateMedic } from '@/utils/models/medic'
import { User } from '@/utils/models/user'
import { UsersRepository } from '../users-repository'

export class MongoDBMedicRepository implements MedicRepository {
  private medicCollection: Collection<Medic>

  constructor(private usersRepository: UsersRepository) {
    this.medicCollection = client.db().collection<Medic>('medics')
  }

  async findAll(): Promise<(User & object)[] | null> {
    try {
      const medics = await this.medicCollection.find().toArray()

      const usersPromises = medics.map((medic) => this.usersRepository.findById(medic.userId))
      const users = await Promise.all(usersPromises)

      return users.filter((user) => user !== null) as (User & object)[]
    } catch (err) {
      return null
    }
  }

  async findById(id: string): Promise<Medic | null> {
    const medic = await this.medicCollection.findOne({ _id: new ObjectId(id) })

    return medic
  }

  async findByUserId(userId: string): Promise<Medic | null> {
    try {
      const medic = await this.medicCollection.findOne({ userId })

      return medic
    } catch (err) {
      return null
    }
  }

  async findByCRM(crm: string): Promise<Medic | null> {
    try {
      const medic = await this.medicCollection.findOne({ crm })

      return medic
    } catch (err) {
      return null
    }
  }

  async create(data: CreateMedic): Promise<MedicId | null> {
    const medic = await this.medicCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    if (medic.acknowledged) {
      return {
        id: medic.insertedId.toString(),
      }
    }

    return null
  }

  async delete(crm: string): Promise<boolean | null> {
    try {
      const medic = await this.medicCollection.deleteOne({ crm })

      if (medic.acknowledged) {
        if (medic.deletedCount > 0) {
          return true
        }
      }

      return false
    } catch (err) {
      return null
    }
  }

  async update(crm: string, data: UpdateMedic): Promise<Medic | null> {
    try {
      const medic = await this.medicCollection.updateOne({ crm }, { $set: data })

      if (medic.acknowledged) {
        if (medic.modifiedCount > 0) {
          return await this.medicCollection.findOne({ crm })
        }
      }

      return null
    } catch (err) {
      return null
    }
  }

  async getMedicName(id: string): Promise<string | null> {
    const medic = await this.findById(id)

    if (!medic) {
      return null
    }

    const user = await this.usersRepository.findById(medic.userId)

    if (user) {
      return user.name
    }

    return null
  }
}
