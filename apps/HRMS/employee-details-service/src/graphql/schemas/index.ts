import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema]);
