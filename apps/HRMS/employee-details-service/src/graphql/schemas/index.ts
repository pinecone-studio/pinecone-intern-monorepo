import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';
import { employeeDetailsSchema } from './employee';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema, employeeDetailsSchema]);
