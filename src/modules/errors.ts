import type { Errors } from '../interfaces/errors';

class ErrorWithCode extends Error {
  code: number;
  constructor({ message, code }: { message: string; code: Errors }) {
    super(message);
    this.code = code;
  }
}

export { ErrorWithCode };
