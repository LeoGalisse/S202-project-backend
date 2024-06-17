import { InMemoryMedicRepository } from '@/repositories/in-memory/in-memory-medic-repository'
import { beforeEach, expect, describe, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UpdateMedicUseCase } from './update.service'

let medicRepository: InMemoryMedicRepository
let sut: UpdateMedicUseCase

describe('Update Medic Use Case', () => {
  beforeEach(() => {
    medicRepository = new InMemoryMedicRepository()
    sut = new UpdateMedicUseCase(medicRepository)
  })

  it('should be able to update a medic', async () => {
    await medicRepository.create({
      crm: '12345678910',
      userId: '12345678910',
    })

    const { medic } = await sut.execute({
      crm: '12345678910',
      data: {
        bio: 'any_bio',
      },
    })

    expect(medic.bio).toEqual('any_bio')
  })

  it('should not be able to update a medic that does not exists', async () => {
    await expect(() =>
      sut.execute({
        crm: '12345678910',
        data: {
          bio: 'SC',
        },
      }),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
