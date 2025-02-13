import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { buildIntegerFkCreator } from '../../utils';

export const timezone = pgTable('timezones', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    tzIdentifier: varchar('tz_identifier', { length: 30 }).notNull()
});

export const timezoneSchema = createSelectSchema(timezone);

export const createTimezoneFk = buildIntegerFkCreator(timezone.id, 'timezone_id');
