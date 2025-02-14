import { RateLimitExceededException } from '$lib/server/errors';
import { Octokit } from '@octokit/core';
import { RequestError } from '@octokit/request-error';
import { InvalidOAuthCredentials } from '../../../shared/errors';
import type { OAuthTokens } from '../../../shared/models';
import type { IOAuthProfileRetrieverService } from '../../core/interfaces/profile-retriever';
import { GithubProfile } from '../../core/models/profiles';

export class GithubProfileRetrieverService implements IOAuthProfileRetrieverService<GithubProfile> {
    async getProfile(tokens: OAuthTokens): Promise<GithubProfile> {
        const octokit = new Octokit({ auth: tokens.accessToken });
        try {
            const request = await octokit.request('GET /user', {
                /**
                 * To facilitate migration to the new [node_id] format, you can use the
                 * X-Github-Next-Global-ID header in your [...] requests. [...]
                 * Setting the value to 1 will force the response payload to always use the new ID
                 * format for any object that you requested the id field for.
                 *
                 * For more information, see:
                 * https://docs.github.com/en/graphql/guides/migrating-graphql-global-node-ids
                 */
                headers: { 'x-github-next-global-id': 1 }
            });
            const { id, node_id, login, html_url, avatar_url } = request.data;
            return new GithubProfile({
                id,
                nodeId: node_id,
                username: login,
                profileUrl: html_url,
                profilePictureUrl: avatar_url
            });
        } catch (e: unknown) {
            throw handleError(e);
        }
    }
}

function handleError(e: unknown) {
    if (!(e instanceof RequestError)) return e;
    switch (e.status) {
        case 401:
            return new InvalidOAuthCredentials({ message: e.message, originalError: e });
        case 403:
        case 409:
            return new RateLimitExceededException({
                message: 'OAuth rate limit exceeded',
                rateLimitResets: Number(e.request.headers['x-ratelimit-reset'] as string),
                originalError: e
            });
        default:
            return e;
    }
}
