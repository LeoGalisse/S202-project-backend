import { client } from '@/lib/mongodb'
import { MedicRepository } from '../medic-repository'
import { Collection, ObjectId } from 'mongodb'
import { CreateMedic, Medic, MedicId, UpdateMedic } from '@/utils/models/medic'

export class MongoDBMedicRepository implements MedicRepository {
  private medicCollection: Collection<Medic>

  constructor() {
    this.medicCollection = client.db().collection<Medic>('medics')
  }

  async findAll(): Promise<Medic[] | null> {
    try {
      return await this.medicCollection.find().toArray()
    } catch (err) {
      return null
    }
  }

  async findById(id: string): Promise<Medic | null> {
    const medic = await this.medicCollection.findOne({ _id: new ObjectId(id) })

    return medic
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
}
