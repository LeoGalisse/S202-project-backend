export class MedicAlreadyExistsError extends Error {
  constructor() {
    super('Medic already exists.')
  }
}
