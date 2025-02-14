import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { PgliteDatabase, PgliteQueryResultHKT } from 'drizzle-orm/pglite';
import type { PostgresJsDatabase, PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';

export type DrizzleDb = PostgresJsDatabase | PgliteDatabase;
export type DrizzleTransaction = PgTransaction<
    PostgresJsQueryResultHKT | PgliteQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
>;
