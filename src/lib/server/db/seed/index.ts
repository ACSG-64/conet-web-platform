import { languages, timezones } from '$lib/constants';
import { language, timezone } from '../schemas';
import type { DrizzleDb } from '../types';

export async function seedDatabase(db: DrizzleDb) {
    await db.transaction(async (tx) =>
        Promise.all([
            tx.insert(language).values(languages).onConflictDoNothing(),
            tx.insert(timezone).values(timezones).onConflictDoNothing()
        ])
    );
}
