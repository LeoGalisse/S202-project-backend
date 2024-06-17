import { InMemoryMedicRepository } from '@/repositories/in-memory/in-memory-medic-repository'
import { GetMedicUseCase } from './get.service'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let medicRepository: InMemoryMedicRepository
let sut: GetMedicUseCase

describe('Get medic', () => {
  beforeEach(() => {
    medicRepository = new InMemoryMedicRepository()
    sut = new GetMedicUseCase(medicRepository)
  })

  it('should be able to get a medic', async () => {
    const { crm } = await medicRepository.create({
      crm: '12345678910',
      user: { connect: { id: '12345678910' } },
    })

    const { medic } = await sut.execute({
      crm,
    })

    expect(medic.crm).toEqual(crm)
  })

  it('should not be able to get a medic that does not exists', async () => {
    await expect(() =>
      sut.execute({
        crm: '12345678910',
      }),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
