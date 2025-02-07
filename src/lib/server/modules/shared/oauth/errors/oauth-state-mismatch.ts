import { HttpException } from '$lib/server/errors/abstract';
import { httpErrorCodes } from '$lib/server/utils/http-error-codes';

/**
 * It is thrown when there is a mismatch between the expected state and the
 * received state from the OAuth callback
 */
export class OAuthStateMismatchException extends HttpException {
    constructor(message: string = "State and expected state doesn't match") {
        super({ status: httpErrorCodes.BadRequest, message });
    }
}
