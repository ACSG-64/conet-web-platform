import { httpErrorCodes } from '$lib/server/utils/http-error-codes';
import { OAuthHttpException } from './generic-http-exception';

type args = {
    message?: string;
    originalError?: Error;
};

/**
 * It is thrown when there the credentials (e.g., tokens) are invalid or are expired
 */
export class InvalidOAuthCredentials extends OAuthHttpException {
    constructor({ message = 'The credentials are invalid', originalError }: args) {
        super({ status: httpErrorCodes.Unauthorized, message, originalError });
    }
}
