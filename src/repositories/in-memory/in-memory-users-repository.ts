import { UsersRepository } from '@/repositories/users-repository'
import { CreateUser, UserWithId } from '@/utils/models/user'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserWithId[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUser) {
    const user = {
      id: randomUUID(),
      name: data.name,
      socialName: data.socialName || undefined,
      rg: data.rg,
      cpf: data.cpf,
      gender: data.gender,
      birthDate: data.birthDate,
      email: data.email,
      password: await hash(data.password, 8),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return {
      insertedId: user.id,
    }
  }
}
