import { char, pgTable, varchar, type UpdateDeleteAction } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const language = pgTable('languages', {
    iso: char('iso', { length: 2 }).notNull().primaryKey(),
    name: varchar('name', { length: 15 }).notNull()
});

export const languageSchema = createSelectSchema(language);

export const createLanguageFk = (
    fkName: string = 'language_id',
    onDelete: UpdateDeleteAction = 'cascade',
    onUpdate: UpdateDeleteAction = 'cascade'
) => char(fkName, { length: 2 }).references(() => language.iso, { onDelete, onUpdate });
