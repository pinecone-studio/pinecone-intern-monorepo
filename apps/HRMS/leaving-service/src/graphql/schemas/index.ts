import { mergeTypeDefs } from '@graphql-tools/merge';
import { LeaveRequestTypeDefs } from './schema';
import { helloLeavingSchema } from './hello.schema';
import { EmployeeTypeDefs } from './employee.schema';

export const typeDefs = mergeTypeDefs([LeaveRequestTypeDefs, helloLeavingSchema , EmployeeTypeDefs]);
