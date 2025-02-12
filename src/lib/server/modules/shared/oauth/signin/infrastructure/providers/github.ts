import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/core';
import { GitHub } from 'arctic';
import { OAuthTokens } from '../../../shared/models';
import type { IOAuthProvider } from '../../core/interfaces';

export class GitHubOAuthProvider implements IOAuthProvider {
    private readonly provider: GitHub;
    private readonly octokit: Octokit;
    private readonly clientId: string;

    constructor(clientId: string, clientSecret: string, redirectURI?: string) {
        this.provider = new GitHub(clientId, clientSecret, redirectURI ?? null);
        this.octokit = new Octokit({
            authStrategy: createOAuthAppAuth,
            auth: { clientType: 'oauth-app', clientId, clientSecret }
        });
        this.clientId = clientId;
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

    async revokeAccessToken(accessToken: string): Promise<void> {
        await this.octokit.request('DELETE /applications/{client_id}/token', {
            client_id: this.clientId,
            access_token: accessToken
        });
    }
}
