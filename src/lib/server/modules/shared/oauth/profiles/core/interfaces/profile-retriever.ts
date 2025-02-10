import type { OAuthTokens } from '../../../shared/models';

/**
 * A service to retrieve the profile information from a third party service.
 */
export interface IOAuthProfileRetrieverService<T> {
    /**
     * Retrieves the profile information
     * @param tokens
     * @returns The profile information
     */
    getProfile(tokens: OAuthTokens): Promise<T>;
}
