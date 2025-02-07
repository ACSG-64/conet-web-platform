import { zodSchemaParser } from '$lib/server/utils/custom-zod-schema-parser';
import { z } from 'zod';
import { BrandedClass } from '../../../models/abstract';

const schema = z.object({
    state: z.string().max(200).nonempty(),
    url: z.string().url().nonempty()
});

type oAuthSigninElementsArgs = z.infer<typeof schema>;

/**
 * It provides the state parameter and the redirection URL to the external provider
 */
export class OAuthSigninElements extends BrandedClass {
    protected __brand!: void;
    readonly state: string;
    readonly url: URL;

    constructor(args: oAuthSigninElementsArgs) {
        super();
        const { state, url } = zodSchemaParser(args, schema);
        this.state = state;
        this.url = new URL(url);
    }
}
