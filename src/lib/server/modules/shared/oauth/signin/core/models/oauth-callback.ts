import { zodSchemaParser } from '$lib/server/utils/custom-zod-schema-parser';
import { z } from 'zod';
import { BrandedClass } from '../../../../models/abstract';

const schema = z.object({
    state: z.string(),
    expectedState: z.string(),
    code: z.string()
});

type oAuthCallbackArgs = z.infer<typeof schema>;

export class OAuthCallback extends BrandedClass {
    protected __brand!: void;
    readonly state: string;
    readonly expectedState: string;
    readonly code: string;

    constructor(args: oAuthCallbackArgs) {
        super();
        const { state, expectedState, code } = zodSchemaParser(args, schema);
        this.state = state;
        this.expectedState = expectedState;
        this.code = code;
    }
}
