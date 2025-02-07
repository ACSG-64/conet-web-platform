type httpException = {
    status: number;
    message?: string;
    originalError?: Error;
};

/**
 * Abstract class for custom exceptions.
 * It provides an status field to set the appropriate HTTP error code.
 */
export abstract class HttpException extends Error {
    readonly status: number;
    readonly originalError?: Error;
    /**
     * @param {object} args
     * @param {number} args.status HTTP error code
     * @param {string?} args.message Error message
     * @param {Error?} args.originalError If this is a rethrow, pass the original error that was raised
     */
    constructor({ status, message, originalError }: httpException) {
        super(message);
        this.status = status;
        this.originalError = originalError ?? new Error(message);
    }
}
