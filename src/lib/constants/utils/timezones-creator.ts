import fs from 'fs/promises';
import { constantsFolder } from '..';
import path from 'path';

const timezones = Intl.supportedValuesOf('timeZone');
const timezonesJson = timezones.map((tzIdentifier, i) => ({ id: i + 1, tzIdentifier }));

const targetFile = path.resolve(constantsFolder, 'timezones.json');

console.log('Writing...');
await fs.writeFile(targetFile, JSON.stringify(timezonesJson, null, 4));
console.log(`Done! Output file: ${targetFile}`);
process.exit();
