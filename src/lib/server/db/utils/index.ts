import { integer, PgColumn, type UpdateDeleteAction } from 'drizzle-orm/pg-core';

export const generateIntegerPkField = (fieldName = 'id') =>
    integer(fieldName).primaryKey().generatedAlwaysAsIdentity();

export const buildIntegerFkCreator = (parentTableColumn: PgColumn, defaultFkName: string) => {
    return (
        fkName: string = defaultFkName,
        onDelete: UpdateDeleteAction = 'cascade',
        onUpdate: UpdateDeleteAction = 'cascade'
    ) => integer(fkName).references(() => parentTableColumn, { onDelete, onUpdate });
};
