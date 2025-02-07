import type { ZodError } from 'zod';
import { httpErrorCodes } from '../utils/http-error-codes';
import { HttpException } from './abstract';

/**
 * It is thrown when the data provided is invalid
 * (e.g. it does not conform to a schema, conflicts with the state, etc.).
 */
export class InvalidDataException extends HttpException {
    constructor(readonly errors: ZodError) {
        super({ status: httpErrorCodes.BadRequest, originalError: errors });
    }
}
