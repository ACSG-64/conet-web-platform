import {
    IOAuthProvider,
    IOAuthSigninService
} from '$lib/server/modules/shared/oauth/signin/core/interfaces';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { DependencyContainer } from 'tsyringe';

/**
 * Creates an OAuth signin handler to be used in an API endpoint. It will redirect the user to the
 * third party sign in web page. It works assuming there is a valid DI container.
 * @param container Must have registered implementations for the IOAuthSigninService and IOAuthProvider interfaces
 * @param scopes OAuth scopes
 * @returns The handler function
 */
export function createOAuthSigninHandler(container: DependencyContainer, scopes: string[] = []) {
    return ({ cookies }: RequestEvent): Promise<Response> => {
        // Get the services from the container
        const oAuthSigninService = container.resolve<IOAuthSigninService>(IOAuthSigninService);
        const oAuthProvider = container.resolve<IOAuthProvider>(IOAuthProvider);

        const { state, url } = oAuthSigninService.signin(oAuthProvider, scopes);
        // Store the expected state in a cookie
        cookies.set('oauth_state', state, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: 'lax'
        });
        // Redirect to the external signin webpage
        redirect(302, url);
    };
}
