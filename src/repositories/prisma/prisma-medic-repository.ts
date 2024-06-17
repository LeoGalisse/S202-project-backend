import { prisma } from '@/lib/prisma'
import { MedicRepository } from '../medic-repository'
import { Medic, Prisma } from '@prisma/client'

export class PrismaMedicRepository implements MedicRepository {
  async findAll(): Promise<Medic[] | null> {
    try {
      return await prisma.medic.findMany()
    } catch (err) {
      return null
    }
  }

  async findById(id: string): Promise<Medic | null> {
    return await prisma.medic.findUnique({
      where: { id },
    })
  }

  async findByCRM(crm: string): Promise<Medic | null> {
    try {
      return await prisma.medic.findUnique({
        where: { crm },
      })
    } catch (err) {
      return null
    }
  }

  async create(data: Prisma.MedicCreateInput): Promise<Medic> {
    return await prisma.medic.create({
      data,
    })
  }

  async delete(crm: string): Promise<Medic | null> {
    try {
      return await prisma.medic.delete({
        where: { crm },
      })
    } catch (err) {
      return null
    }
  }

  async update(crm: string, data: Prisma.MedicUpdateInput): Promise<Medic | null> {
    try {
      return await prisma.medic.update({
        where: { crm },
        data,
      })
    } catch (err) {
      return null
    }
  }
}
