import type { OAuthTokens } from '../models';

export const IOAuthProvider = Symbol();

/**
 * The OAuth provider
 */
export interface IOAuthProvider {
    /**
     * Creates the authorization URL
     * @param state The OAuth state parameter
     * @param scopes OAuth scopes
     */
    createAuthorizationURL(state: string, scopes: string[]): URL;
    /**
     * Retrieves the OAuth tokens after performing the signing process
     * @param code Received code form the callback
     */
    validateAuthorizationCode(code: string): Promise<OAuthTokens>;
}
