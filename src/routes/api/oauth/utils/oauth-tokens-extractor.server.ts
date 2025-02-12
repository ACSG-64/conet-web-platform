import type { OAuthTokens } from '$lib/server/modules/shared/oauth/shared/models';
import {
    IOAuthProvider,
    IOAuthSigninService
} from '$lib/server/modules/shared/oauth/signin/core/interfaces';
import { OAuthCallback } from '$lib/server/modules/shared/oauth/signin/core/models';
import type { RequestEvent } from '@sveltejs/kit';
import type { DependencyContainer } from 'tsyringe';

/**
 * Extracts the OAuth callback data from the request event and retrieves the OAuth tokens
 * @param container Must have registered implementations for the IOAuthSigninService and IOAuthProvider interfaces
 * @param event
 * @returns OAuth Tokens
 */
export function extractOAuthTokens(
    container: DependencyContainer,
    { url, cookies }: RequestEvent
): Promise<OAuthTokens> {
    // Extract the data from the callback
    const oAuthCallback = new OAuthCallback({
        code: url.searchParams.get('code') as string,
        state: url.searchParams.get('state') as string,
        expectedState: cookies.get('oauth_state') as string
    });
    // Get the services from the container
    const oAuthSigninService = container.resolve<IOAuthSigninService>(IOAuthSigninService);
    const oAuthProvider = container.resolve<IOAuthProvider>(IOAuthProvider);
    // Retrieve the tokens
    return oAuthSigninService.getTokens(oAuthProvider, oAuthCallback);
}
