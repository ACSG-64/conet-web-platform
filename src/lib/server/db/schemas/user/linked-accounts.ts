import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createUserFk } from './user';
import { createSelectSchema } from 'drizzle-zod';

export const githubAccount = pgTable(
    'github_accounts',
    {
        userId: createUserFk().primaryKey(),
        objectId: integer('object_id').notNull(),
        nodeId: varchar('node_id', { length: 30 }).notNull().unique()
    },
    (t) => [uniqueIndex('gh_idx').on(t.objectId)]
);

export const discordAccount = pgTable('discord_accounts', {
    userId: createUserFk().primaryKey(),
    accountId: varchar('account_id', { length: 25 }).notNull().unique(),
    notificationChannelId: varchar('notification_channel_id', { length: 25 }).notNull().unique()
});

export const githubAccountTableSchema = createSelectSchema(githubAccount, {
    userId: (schema) => schema.positive(),
    objectId: (schema) => schema.positive(),
    nodeId: (schema) => schema.base64().nonempty()
});

export const discordAccountSchema = createSelectSchema(discordAccount, {
    userId: (schema) => schema.positive(),
    accountId: (schema) =>
        schema.regex(/^\d+$/, { message: 'Must be a numeric string' }).nonempty(),
    notificationChannelId: (schema) =>
        schema.regex(/^\d+$/, { message: 'Must be a numeric string' }).nonempty()
});
