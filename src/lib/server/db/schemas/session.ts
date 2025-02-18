import { char, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { createUserFk } from './user';

export const session = pgTable('sessions', {
    uuid: char('uuid', { length: 21 }).primaryKey(),
    userId: createUserFk().notNull().unique(),
    createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const sessionSchema = createSelectSchema(session);
