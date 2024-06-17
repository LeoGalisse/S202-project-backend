import { CreateMedic, Medic, MedicId, UpdateMedic } from '@/utils/models/medic'

export interface MedicRepository {
  findById(id: string): Promise<Medic | null>
  findByCRM(crm: string): Promise<Medic | null>
  findAll(): Promise<Medic[] | null>
  create(data: CreateMedic): Promise<MedicId | null>
  delete(id: string): Promise<boolean | null>
  update(id: string, data: UpdateMedic): Promise<Medic | null>
}
