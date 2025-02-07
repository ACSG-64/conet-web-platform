import { describe, expect, it } from 'vitest';
import { IOAuthProvider } from '../core/interfaces';
import { OAuthCallback, OAuthTokens } from '../core/models';
import { OAuthSigninService } from '../core/services';
import { OAuthStateMismatchException } from '../errors';

class NotImplementedOAuthProvider implements IOAuthProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createAuthorizationURL(state: string, scopes: string[]): URL {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validateAuthorizationCode(code: string): Promise<OAuthTokens> {
        return new OAuthTokens({
            accessToken: 'TEST TOKEN',
            expires: new Date().getSeconds() + 60 * 60
        });
    }
}

describe('OAuth Signin callback test', () => {
    it("throws an error if the state doesn't match", async () => {
        const testProvider = new NotImplementedOAuthProvider();
        const oauthSignin = new OAuthSigninService();
        // GIVEN a callback with a different state than the expected state
        const oauthCallback = new OAuthCallback({
            state: 'state A',
            expectedState: 'state B',
            code: 'code'
        });
        // WHEN trying to get the tokens
        const getTokensFn = () => oauthSignin.getTokens(testProvider, oauthCallback);
        // THEN it should throw an OAuthStateMismatchException
        expect(getTokensFn).toThrow(OAuthStateMismatchException);
    });

    it("doesn't throw an error if the state matches", async () => {
        const testProvider = new NotImplementedOAuthProvider();
        const oauthSignin = new OAuthSigninService();
        // GIVEN a callback with a state than is the same as the expected state
        const state = 'state C';
        const oauthCallback = new OAuthCallback({
            state,
            expectedState: state,
            code: 'code'
        });
        // WHEN trying to get the tokens
        const getTokensFn = () => oauthSignin.getTokens(testProvider, oauthCallback);
        // THEN it should not throw an OAuthStateMismatchException
        expect(getTokensFn).not.toThrow(OAuthStateMismatchException);
    });
});
