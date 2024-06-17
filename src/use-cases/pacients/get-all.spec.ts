import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllPacientsUseCase } from './get-all.service'
import { InMemoryPacientRepository } from '@/repositories/in-memory/in-memory-pacients-repository'

let pacientsRepository: InMemoryPacientRepository
let sut: GetAllPacientsUseCase

describe('Get all pacients', () => {
  beforeEach(() => {
    pacientsRepository = new InMemoryPacientRepository()
    sut = new GetAllPacientsUseCase(pacientsRepository)
  })

  it('should be able to get all pacients', async () => {
    const pacientOne = await pacientsRepository.create({
      userId: 'user-01',
    })

    const pacientTwo = await pacientsRepository.create({
      userId: 'user-02',
    })

    const { pacients } = await sut.execute()

    expect(pacients).toEqual([pacientOne, pacientTwo])
  })
})
