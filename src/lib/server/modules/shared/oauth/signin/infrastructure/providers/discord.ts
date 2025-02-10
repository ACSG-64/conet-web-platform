import { Discord } from 'arctic';
import { OAuthTokens } from '../../../shared/models';
import type { IOAuthProvider } from '../../core/interfaces';

export class DiscordOAuthProvider implements IOAuthProvider {
    private readonly provider: Discord;

    constructor(clientId: string, clientSecret: string, redirectURI: string) {
        this.provider = new Discord(clientId, clientSecret, redirectURI);
    }

    createAuthorizationURL(state: string, scopes: string[]): URL {
        return this.provider.createAuthorizationURL(state, null, scopes);
    }

    async validateAuthorizationCode(code: string): Promise<OAuthTokens> {
        const tokens = await this.provider.validateAuthorizationCode(code, null);
        return new OAuthTokens({
            accessToken: tokens.accessToken(),
            refreshToken: tokens.refreshToken(),
            expires: tokens.accessTokenExpiresInSeconds()
        });
    }
}
