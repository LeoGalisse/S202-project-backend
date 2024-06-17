import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllMedicsUseCase } from './get-all.service'
import { InMemoryMedicRepository } from '@/repositories/in-memory/in-memory-medic-repository'

let medicRepository: InMemoryMedicRepository
let sut: GetAllMedicsUseCase

describe('Get all medic', () => {
  beforeEach(() => {
    medicRepository = new InMemoryMedicRepository()
    sut = new GetAllMedicsUseCase(medicRepository)
  })

  it('should be able to get all medics', async () => {
    await medicRepository.create({
      crm: '12345678910',
      userId: '12345678910',
    })

    const { medics } = await sut.execute()

    expect(medics[0].userId).toEqual('12345678910')
  })
})
