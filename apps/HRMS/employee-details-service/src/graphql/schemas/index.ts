import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';
import { employeeDetailsSchema } from './employee.schema';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema, employeeDetailsSchema]);
