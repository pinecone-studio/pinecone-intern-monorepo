import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';
import { hrmsUserTypeDefs } from './hrms-user-schema';
import { employeeDetailsSchema } from './employee-schema';
import { loginSchema } from './login-schema';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema, hrmsUserTypeDefs, employeeDetailsSchema,loginSchema]);
