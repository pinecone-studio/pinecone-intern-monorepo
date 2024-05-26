import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloAttendanceSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloAttendanceSchema]);
