import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { buildIntegerFkCreator, generateIntegerPkField } from '../../utils';

export const timezone = pgTable('timezones', {
    id: generateIntegerPkField(),
    tzIdentifier: varchar('tz_identifier', { length: 30 }).notNull()
});

export const timezoneSchema = createSelectSchema(timezone);

export const createTimezoneFk = buildIntegerFkCreator(timezone.id, 'timezone_id');
