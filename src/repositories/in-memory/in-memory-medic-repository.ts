import { Medic, Prisma } from '@prisma/client'
import { MedicRepository } from '../medic-repository'
import { randomUUID } from 'crypto'

export class InMemoryMedicRepository implements MedicRepository {
  private medicList: Medic[] = []

  async findAll(): Promise<Medic[] | null> {
    return this.medicList || null
  }

  async findById(id: string): Promise<Medic | null> {
    return this.medicList.find((medic) => medic.id === id) || null
  }

  async findByCRM(crm: string): Promise<Medic | null> {
    return this.medicList.find((medic) => medic.crm === crm) || null
  }

  async create(medic: Prisma.MedicCreateInput): Promise<Medic> {
    const createMedic = {
      id: randomUUID(),
      createdAt: new Date(),
      updateAt: new Date(),
      userId: randomUUID(),
      bio: medic.bio || null,
      crm: medic.crm,
    }

    this.medicList.push(createMedic)

    return createMedic
  }

  async delete(crm: string): Promise<Medic> {
    const index = this.medicList.findIndex((medic) => medic.crm === crm)

    const medic = this.medicList[index]

    if (index !== -1) {
      this.medicList.splice(index, 1)
    }

    return medic
  }

  async update(crm: string, data: Prisma.MedicUpdateInput) {
    const index = this.medicList.findIndex((m) => m.crm === crm)

    const medic = {
      id: String(''),
      createdAt: data.createdAt as Date,
      updateAt: new Date(),
      userId: String(data.user),
      bio: String(data.bio),
      crm: String(data.crm),
    }

    if (index !== -1) {
      this.medicList[index] = medic
    }

    return this.medicList[index]
  }
}
