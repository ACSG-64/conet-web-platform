import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { createUserFk, userSchema } from './user';

export const githubAccount = pgTable(
    'github_accounts',
    {
        userId: createUserFk().primaryKey(),
        objectId: integer('object_id').notNull(),
        nodeId: varchar('node_id', { length: 20 }).notNull().unique()
    },
    (t) => [uniqueIndex('gh_idx').on(t.objectId)]
);

export const discordAccount = pgTable('discord_accounts', {
    userId: createUserFk().primaryKey(),
    accountId: varchar('account_id', { length: 25 }).notNull().unique(),
    notificationChannelId: varchar('notification_channel_id', { length: 25 }).notNull().unique()
});

export const githubAccountSchema = createSelectSchema(githubAccount, {
    userId: () => userSchema.shape.id,
    objectId: (schema) => schema.positive(),
    nodeId: (schema) => schema.nonempty()
});

export const discordAccountSchema = createSelectSchema(discordAccount, {
    userId: () => userSchema.shape.id,
    accountId: (schema) =>
        schema.regex(/^\d+$/, { message: 'Must be a numeric string' }).nonempty(),
    notificationChannelId: (schema) =>
        schema.regex(/^\d+$/, { message: 'Must be a numeric string' }).nonempty()
});
