import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloPayrollSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloPayrollSchema]);
