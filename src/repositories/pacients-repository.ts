import { CreatePacient, Pacient, PacientId } from '@/utils/models/pacient'

export interface PacientsRepository {
  findById(id: string): Promise<Pacient | null>
  findAll(): Promise<Pacient[] | null>
  create(data: CreatePacient): Promise<PacientId | null>
  delete(id: string): Promise<boolean | null>
}
