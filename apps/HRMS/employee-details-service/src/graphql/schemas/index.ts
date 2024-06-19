import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';
import {userSchema} from './user.schema'
import { employeeDetailsSchema } from './employee-schema';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema,userSchema,employeeDetailsSchema]);

