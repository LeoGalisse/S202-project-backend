import { InMemoryMedicRepository } from '@/repositories/in-memory/in-memory-medic-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteMedicUseCase } from './delete.service'

let medicRepository: InMemoryMedicRepository
let sut: DeleteMedicUseCase

describe('Delete medic', () => {
  beforeEach(() => {
    medicRepository = new InMemoryMedicRepository()
    sut = new DeleteMedicUseCase(medicRepository)
  })

  it('should be able to delete a medic', async () => {
    await medicRepository.create({
      crm: '12345678910',
      userId: '12345678910',
    })

    await sut.execute({ crm: '12345678910' })

    const response = await medicRepository.findByCRM('12345678910')

    expect(response).toBeNull()
  })
})
