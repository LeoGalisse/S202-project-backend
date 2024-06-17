import { InMemoryMedicRepository } from '@/repositories/in-memory/in-memory-medic-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMedicUseCase } from './create.service'
import { MedicAlreadyExistsError } from '../errors/medic-already-exists-error'

let medicRepository: InMemoryMedicRepository
let sut: CreateMedicUseCase

describe('Create Medic (e2e)', () => {
  beforeEach(() => {
    medicRepository = new InMemoryMedicRepository()
    sut = new CreateMedicUseCase(medicRepository)
  })

  it('should be able to create a medic', async () => {
    const { medic } = await sut.execute({
      bio: 'any_bio',
      crm: '12345678910',
      userId: '12345678910',
    })

    expect(medic.id).toEqual(expect.any(String))
  })

  it('should not be able to create a medic with same CRM', async () => {
    await sut.execute({
      crm: '12345678910',
      userId: '12345678910',
    })

    await expect(() =>
      sut.execute({
        crm: '12345678910',
        userId: '12345678910',
      }),
    ).rejects.toThrow(MedicAlreadyExistsError)
  })
})
