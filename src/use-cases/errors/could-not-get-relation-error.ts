export class CouldNotGetRelationError extends Error {
  constructor() {
    super('Could not get the relation from the id provided.')
  }
}
