class CeramicError extends Error {
  errors: { [key: string]: any };
  constructor(errors: { [key: string]: any }) {
    super('Errors retrieving data from ceramic node');
    this.errors = errors;
  }
}

export { CeramicError };
