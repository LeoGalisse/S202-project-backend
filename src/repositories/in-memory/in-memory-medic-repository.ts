import { CreateMedic, Medic, MedicId, MedicWithId, UpdateMedic } from '@/utils/models/medic'
import { MedicRepository } from '../medic-repository'
import { randomUUID } from 'crypto'

export class InMemoryMedicRepository implements MedicRepository {
  private medicList: MedicWithId[] = []

  async findAll(): Promise<Medic[] | null> {
    return this.medicList || null
  }

  async findById(id: string): Promise<Medic | null> {
    return this.medicList.find((medic) => medic.id === id) || null
  }

  async findByCRM(crm: string): Promise<Medic | null> {
    return this.medicList.find((medic) => medic.crm === crm) || null
  }

  async create(medic: CreateMedic): Promise<MedicId> {
    const createMedic = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: randomUUID(),
      bio: medic.bio || undefined,
      crm: medic.crm,
    }

    this.medicList.push(createMedic)

    return {
      id: createMedic.id,
    }
  }

  async delete(crm: string): Promise<boolean | null> {
    const index = this.medicList.findIndex((medic) => medic.crm === crm)

    if (index !== -1) {
      this.medicList.splice(index, 1)
    }

    return true
  }

  async update(crm: string, data: UpdateMedic) {
    const index = this.medicList.findIndex((m) => m.crm === crm)

    const medic = {
      id: String(''),
      createdAt: this.medicList[index].createdAt,
      updatedAt: new Date(),
      userId: this.medicList[index].userId,
      bio: String(data.bio),
      crm: String(data.crm),
    }

    if (index !== -1) {
      this.medicList[index] = medic
    }

    return this.medicList[index]
  }
}
