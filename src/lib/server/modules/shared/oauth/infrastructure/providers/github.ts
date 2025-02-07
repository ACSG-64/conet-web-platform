import { GitHub } from 'arctic';
import type { IOAuthProvider } from '../../core/interfaces';
import { OAuthTokens } from '../../core/models';

export class GitHubOAuthProvider implements IOAuthProvider {
    private readonly provider: GitHub;

    constructor(clientId: string, clientSecret: string, redirectURI: string | null) {
        this.provider = new GitHub(clientId, clientSecret, redirectURI);
    }

    createAuthorizationURL(state: string, scopes: string[]): URL {
        return this.provider.createAuthorizationURL(state, scopes);
    }

    async validateAuthorizationCode(code: string): Promise<OAuthTokens> {
        const tokens = await this.provider.validateAuthorizationCode(code);
        return new OAuthTokens({
            accessToken: tokens.accessToken(),
            refreshToken: tokens.refreshToken(),
            expires: tokens.accessTokenExpiresInSeconds()
        });
    }
}
