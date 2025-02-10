import { describe, expect, it } from 'vitest';
import { DiscordOAuthProvider, GitHubOAuthProvider } from '../infrastructure/providers';
import { OAuthSigninService } from '../core/services';

describe('OAuth Signin with providers', () => {
    it('Signs in with Github', () => {
        // GIVEN an OAuth provider
        const testClientId = 'TEST CLIENT ID';
        const githubOauthTestProvider = new GitHubOAuthProvider(testClientId, 'TEST SECRET', null);

        // WHEN signing in
        const oauthSignin = new OAuthSigninService();
        const { state, url } = oauthSignin.signin(githubOauthTestProvider, ['repo', 'user']);

        // THEN the URL should be an URL object with the correct parameters
        expect(url).toBeInstanceOf(URL);
        // The host should be github.com
        expect(url.host).toBe('github.com');
        expect(url.pathname).toBe('/login/oauth/authorize');
        // The search params should contain the client_id, scope and state
        expect(url.searchParams.get('client_id')).toBe(testClientId);
        expect(url.searchParams.get('scope')).toBe('repo user');
        expect(url.searchParams.get('state')).toBe(state);
    });

    it('Signs in with Discord', () => {
        // GIVEN an OAuth provider
        const testClientId = 'TEST CLIENT ID';
        const redirectUri = 'localhost:7777/callback';
        const discordOauthTestProvider = new DiscordOAuthProvider(
            testClientId,
            'TEST SECRET',
            redirectUri
        );

        // WHEN signing in
        const oauthSignin = new OAuthSigninService();
        const { state, url } = oauthSignin.signin(discordOauthTestProvider, [
            'role_connections.write',
            'identify'
        ]);

        // THEN the URL should be an URL object with the correct parameters
        expect(url).toBeInstanceOf(URL);
        // The host should be discord.com
        expect(url.host).toBe('discord.com');
        expect(url.pathname).toBe('/oauth2/authorize');
        // The search params should contain the client_id, scope and state
        expect(url.searchParams.get('response_type')).toBe('code');
        expect(url.searchParams.get('client_id')).toBe(testClientId);
        expect(url.searchParams.get('scope')).toBe('role_connections.write identify');
        expect(url.searchParams.get('state')).toBe(state);
        expect(url.searchParams.get('redirect_uri')).toBe(redirectUri);
    });
});
