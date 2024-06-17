import { prisma } from '@/lib/prisma'
import { Pacient, Prisma } from '@prisma/client'

import { PacientsRepository } from '../pacients-repository'

export class PrismaPacientRepository implements PacientsRepository {
  async findAll(): Promise<Pacient[] | null> {
    try {
      return await prisma.pacient.findMany()
    } catch (err) {
      return null
    }
  }

  async findById(id: string) {
    const pacient = await prisma.pacient.findUnique({
      where: {
        id,
      },
    })

    return pacient
  }

  async create(data: Prisma.PacientUncheckedCreateInput) {
    return await prisma.pacient.create({
      data,
    })
  }

  async delete(userId: string): Promise<Pacient | null> {
    try {
      return await prisma.pacient.delete({
        where: {
          userId,
        },
      })
    } catch (err) {
      return null
    }
  }
}
