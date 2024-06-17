export class CouldNotCreateRelationError extends Error {
  constructor() {
    super("Could not create a relation between the id's provided.")
  }
}
