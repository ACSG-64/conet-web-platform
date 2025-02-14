import { PGlite } from '@electric-sql/pglite';
import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import { seedDatabase } from '../seed';
import { migrationsFolder } from '$lib/server/db/migrations';

/**
 * In-memory PostgreSQL database
 */
export class InMemoryDatabaseProvider {
    protected _db: PgliteDatabase;
    protected client: PGlite;

    constructor() {
        this.client = new PGlite(); // In memory PostgreSQL Db
        this._db = drizzle(this.client);
    }

    /**
     * Call the `initialize` method before using this getter
     */
    get db(): PgliteDatabase {
        return this._db;
    }

    /**
     * Initializes a new seeded database with the tables specified
     * in the migrations folder
     */
    async initialize(): Promise<void> {
        if (!this.client.closed) await this.destroy();
        this.client = new PGlite(); // In memory PostgreSQL Db
        this._db = drizzle(this.client);
        await migrate(this._db, { migrationsFolder });
        await seedDatabase(this._db);
    }

    /**
     * Closes the db connection effectively destroying the database
     * since its contents are stored in-memory
     */
    async destroy(): Promise<void> {
        return this.client.close();
    }
}
