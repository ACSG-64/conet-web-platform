import { instanceCachingFactory, container as RootContainer } from 'tsyringe';
import { getDbClient } from '.';
import type { DrizzleDb } from './types';

/**
 * Use this DI token if you need to resolve the dependency
 * to get the database connector
 */
export const dbContextToken = Symbol();

/**
 * Use  this DI container as the parent root container 
 * if other classes depend on the database
 */
const dbContainer = RootContainer.createChildContainer();
dbContainer.register<DrizzleDb>(dbContextToken, {
    useFactory: instanceCachingFactory(getDbClient) // Instantiate on demand once
});

export { dbContainer };
