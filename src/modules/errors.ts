import type { Errors } from '../interfaces/errors';

class ErrorWithCode extends Error {
  code: number;
  constructor({ message, code }: { message: string; code: Errors }) {
    super(message);
    this.code = code;
  }
}

class CeramicError extends ErrorWithCode {
  errors: { [key: string]: any };
  constructor(errors: { [key: string]: any }) {
    super({ message: 'Errors retrieving data from ceramic node', code: 3 });
    this.errors = errors;
  }
}

export { CeramicError, ErrorWithCode };
