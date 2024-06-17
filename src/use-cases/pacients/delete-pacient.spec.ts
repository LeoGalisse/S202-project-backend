import { InMemoryPacientRepository } from '@/repositories/in-memory/in-memory-pacients-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { DeletePacientUseCase } from './delete-pacient.service'

let pacientsRepository: InMemoryPacientRepository
let sut: DeletePacientUseCase

describe('Delete Pacient Use Case', () => {
  beforeEach(() => {
    pacientsRepository = new InMemoryPacientRepository()
    sut = new DeletePacientUseCase(pacientsRepository)
  })

  it('should be able to delete a pacient', async () => {
    await pacientsRepository.create({
      id: '123',
      createdAt: new Date(),
      updateAt: null,
      userId: 'user-01',
    })

    await sut.execute({ userId: 'user-01' })

    const pacient = await pacientsRepository.findById('123')

    expect(pacient).toBeNull()
  })
})
