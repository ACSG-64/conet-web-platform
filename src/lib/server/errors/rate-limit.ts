import { httpErrorCodes } from '../utils/http-error-codes';
import { HttpException, type httpExceptionCommon } from './abstract';

type args = {
    rateLimitResets?: number;
} & httpExceptionCommon;

export class RateLimitExceededException extends HttpException {
    public readonly rateLimitResets?: number;
    constructor({ rateLimitResets, message = 'Rate limit exceeded', originalError }: args) {
        super({ status: httpErrorCodes.TooManyRequests, message, originalError });
        this.rateLimitResets = rateLimitResets;
    }
}
