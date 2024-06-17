import { CreatePacient, PacientWithId } from '@/utils/models/pacient'
import { PacientsRepository } from '../pacients-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPacientRepository implements PacientsRepository {
  private items: PacientWithId[] = []

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

  async create(data: CreatePacient) {
    const pacient = {
      id: randomUUID(),
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(pacient)

    return pacient
  }

  async delete(userId: string) {
    const index = this.items.findIndex((item) => item.userId === userId)

    if (index === -1) {
      this.items.splice(index, 1)
    }

    return true
  }
}
