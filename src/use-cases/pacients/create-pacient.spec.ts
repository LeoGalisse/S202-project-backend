import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePacientUseCase } from './create-pacient.service'
import { InMemoryPacientRepository } from '@/repositories/in-memory/in-memory-pacients-repository'

let pacientsRepository: InMemoryPacientRepository
let sut: CreatePacientUseCase

describe('Create pacient Use Case', () => {
  beforeEach(() => {
    pacientsRepository = new InMemoryPacientRepository()
    sut = new CreatePacientUseCase(pacientsRepository)
  })

  it('should be able to create pacient', async () => {
    const { pacient } = await sut.execute({
      userId: 'user-01',
    })

    if (!pacient) {
      throw new Error('Pacient not created')
    }

    expect(pacient.id).toEqual(expect.any(String))
  })
})
