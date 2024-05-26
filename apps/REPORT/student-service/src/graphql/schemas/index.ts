import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloStudentSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloStudentSchema]);
