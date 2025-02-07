import { generateState } from 'arctic';
import { OAuthStateMismatchException } from '../../errors';
import type { IOAuthProvider, IOAuthSigninService } from '../interfaces';
import type { OAuthCallback, OAuthTokens } from '../models';
import { OAuthSigninElements } from '../models/oauth-signin-elements';

/**
 * Provides methods for signin to external services and
 * retrieving the OAuth tokens from these services
 */
export class OAuthSigninService implements IOAuthSigninService {
    signin(provider: IOAuthProvider, scopes: string[]): OAuthSigninElements {
        const state = generateState();
        const url = provider.createAuthorizationURL(state, scopes);
        return new OAuthSigninElements({ state, url: url.toString() });
    }

    getTokens(provider: IOAuthProvider, callback: OAuthCallback): Promise<OAuthTokens> {
        const { state, expectedState, code } = callback;
        if (state !== expectedState) throw new OAuthStateMismatchException();
        return provider.validateAuthorizationCode(code);
    }
}
