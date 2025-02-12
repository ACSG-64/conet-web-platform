import { REST } from '@discordjs/rest';
import { Discord } from 'arctic';
import { Routes } from 'discord-api-types/v10';
import { OAuthTokens } from '../../../shared/models';
import type { IOAuthProvider } from '../../core/interfaces';

const rest = new REST({ version: '10' });

export class DiscordOAuthProvider implements IOAuthProvider {
    private readonly provider: Discord;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor(clientId: string, clientSecret: string, redirectURI: string) {
        this.provider = new Discord(clientId, clientSecret, redirectURI);
        this.clientId = clientId;
        this.clientSecret = clientSecret;
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

    async revokeAccessToken(accessToken: string): Promise<void> {
        await rest.post(Routes.oauth2TokenRevocation(), {
            body: {
                data: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    token: accessToken,
                    token_type_hint: 'access_token'
                }
            }
        });
    }
}
