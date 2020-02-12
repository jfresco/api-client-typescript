import { Result } from '../types';
import { ApolloQueryResult } from 'apollo-client';
export declare function checkMandatoryParams<T>(...args: Array<Record<string, any>>): Result<T>;
export declare function formatPayload<T>(key: keyof T, { errors, data }: ApolloQueryResult<T>): Result<T[keyof T]>;
