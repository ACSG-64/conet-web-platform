import type { OAuthTokens } from '../../../shared/models';

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
    /**
     * Revokes the access token and potentially also the refresh token
     * @param accessToken
     */
    revokeAccessToken(accessToken: string): Promise<void>;
}
