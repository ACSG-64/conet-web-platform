import type { OAuthCallback, OAuthTokens } from '../models';
import type { OAuthSigninElements } from '../models/oauth-signin-elements';
import type { IOAuthProvider } from './provider';

export const IOAuthSignin = Symbol();

/**
 * Provides methods for signin to external services and
 * retrieving the OAuth tokens from these services
 */
export interface IOAuthSigninService {
    /**
     * Generates the required information to redirect the user to the external service
     * in order to signin from there
     * @param provider The OAuth provider
     * @param scopes OAuth scopes
     * @returns The state parameter and the redirection URL
     */
    signin(provider: IOAuthProvider, scopes: string[]): OAuthSigninElements;

    /**
     * Retrieves the OAuth tokens from the external service after signin
     * @param provider The OAuth provider
     * @param callback The information received from the external service
     * @returns OAuth tokens
     */
    getTokens(provider: IOAuthProvider, callback: OAuthCallback): Promise<OAuthTokens>;
}
