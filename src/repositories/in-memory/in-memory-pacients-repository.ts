import { PacientsRepository } from '../pacients-repository'
import { Prisma, Pacient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPacientRepository implements PacientsRepository {
  private items: Pacient[] = []

  async findAll() {
    return this.items || null
  }

  async findById(id: string) {
    const pacient = this.items.find((item) => item.id === id)

    if (!pacient) {
      return null
    }

    return pacient
  }

  async create(data: Prisma.PacientUncheckedCreateInput) {
    const pacient: Pacient = {
      id: randomUUID(),
      userId: data.userId,
      createdAt: new Date(),
      updateAt: new Date(),
    }

    this.items.push(pacient)

    return pacient
  }

  async delete(userId: string) {
    const index = this.items.findIndex((item) => item.userId === userId)

    const item = this.items[index]
    if (index === -1) {
      this.items.splice(index, 1)
    }

    return item
  }
}
