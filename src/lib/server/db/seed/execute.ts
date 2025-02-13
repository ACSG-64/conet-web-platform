import { getDbClient } from '$lib/server/db';
import { seedDatabase } from '.';

console.log('Seeding in progress');
await seedDatabase(getDbClient());
console.log('Complete!');
process.exit();
