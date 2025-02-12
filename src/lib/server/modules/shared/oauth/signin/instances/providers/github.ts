import { env } from '$env/dynamic/private';
import { GitHubOAuthProvider } from '../../infrastructure/providers';

export const githubOAuthProviderToken = Symbol();
export const githubOAuthProvider = new GitHubOAuthProvider(
    env.GITHUB_OAUTH_CLIENT_ID,
    env.GITHUB_OAUTH_CLIENT_SECRET
);
