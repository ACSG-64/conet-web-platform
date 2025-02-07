import type { z, ZodRawShape } from 'zod';
import { InvalidDataException } from '../errors';

/**
 * Utility to parse data with zod.
 * Custom exception is thrown in case the supplied data does not conform to the Zod schema.
 * @param schema A Zod schema
 * @param data {object} - Data to be parsed by the schema
 * @returns The parsed data
 * @throws InvalidDataException
 */
export function zodSchemaParser(data: unknown, schema: z.ZodObject<ZodRawShape>) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) throw new InvalidDataException(parsed.error);
    return parsed.data;
}
