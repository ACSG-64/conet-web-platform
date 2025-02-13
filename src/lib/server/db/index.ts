import dotenv from 'dotenv';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config();

let db: PostgresJsDatabase;

export function getDbClient() {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    if (!db) db = drizzle(postgres(process.env.DATABASE_URL)); // singleton
    return db;
}
