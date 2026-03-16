import { PipeTransform } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ZodValidationFailedError } from './zod-validation-failed-error.js';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        throw new ZodValidationFailedError([validationError.message]);
      }
      throw error;
    }
  }
}
