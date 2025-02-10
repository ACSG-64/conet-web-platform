import { BrandedClass } from '$lib/server/modules/shared/models/abstract';
import { zodSchemaParser } from '$lib/server/utils/custom-zod-schema-parser';
import { z } from 'zod';

const schema = z.object({
    id: z.number().int().positive(),
    nodeId: z.string().base64().nonempty(),
    username: z.string().nonempty(),
    profileUrl: z.string().url().nonempty(),
    profilePictureUrl: z.string().url().nonempty()
});

type githubProfile = z.infer<typeof schema>;

export class GithubProfile extends BrandedClass {
    protected __brand!: void;
    readonly id: number;
    readonly nodeId: string;
    readonly username: string;
    readonly profileUrl: string;
    readonly profilePictureUrl: string;

    constructor(args: githubProfile) {
        super();
        const { id, nodeId, username, ...urls } = zodSchemaParser(args, schema);
        this.id = id;
        this.nodeId = nodeId;
        this.username = username;
        this.profileUrl = urls.profileUrl;
        this.profilePictureUrl = urls.profilePictureUrl;
    }
}
