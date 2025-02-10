import { char, pgTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { buildIntegerFkCreator, generateIntegerPkField } from '../../utils';
import { createLanguageFk, createTimezoneFk } from '../constants';

export const user = pgTable(
    'users',
    {
        id: generateIntegerPkField(),
        uuid: char('uuid', { length: 21 }).unique().notNull(),
        name: varchar('name', { length: 50 }).notNull(),
        surname: varchar('surname', { length: 50 }).notNull(),
        username: varchar('username', { length: 25 }).notNull().unique(),
        imageUrl: varchar('image_url', { length: 75 }),
        primaryLanguageId: createLanguageFk('primary_language_id').notNull(),
        timezoneId: createTimezoneFk().notNull(),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
    },
    (t) => [uniqueIndex('uuid_idx').on(t.uuid)]
);

export const userSchema = createSelectSchema(user, {
    id: (schema) => schema.positive(),
    imageUrl: (schema) => schema.url(),
    timezoneId: (schema) => schema.positive()
});

export const createUserFk = buildIntegerFkCreator(user.id, 'user_id');
