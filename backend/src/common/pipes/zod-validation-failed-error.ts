import { ApiError } from '../errors/api-error.js';

export class ZodValidationFailedError extends ApiError {
  constructor(errors: string[]) {
    super(400, 'Falha na validação', errors);
  }
}
