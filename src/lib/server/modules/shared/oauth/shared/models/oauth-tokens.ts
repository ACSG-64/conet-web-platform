import { zodSchemaParser } from '$lib/server/utils/custom-zod-schema-parser';
import { z } from 'zod';
import { BrandedClass } from '../../../models/abstract';

const schema = z.object({
    accessToken: z.string().max(2050).nonempty(),
    refreshToken: z.string().optional(),
    expires: z.number().int().positive()
});

type oAuthTokensArgs = z.infer<typeof schema>;
export class OAuthTokens extends BrandedClass {
    protected __brand!: void;
    readonly accessToken: string;
    readonly refreshToken?: string;
    /**
     * Access token expiration date in seconds
     */
    readonly expires: number;

    constructor(args: oAuthTokensArgs) {
        super();
        const { accessToken, refreshToken, expires } = zodSchemaParser(args, schema);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expires = expires;
    }
}
