export class PDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PDBError';
  }
}
