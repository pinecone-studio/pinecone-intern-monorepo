import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloEmployeeDetailsSchema } from './hello.schema';
import { Userchema } from './userSchema';

export const typeDefs = mergeTypeDefs([helloEmployeeDetailsSchema, Userchema]);
