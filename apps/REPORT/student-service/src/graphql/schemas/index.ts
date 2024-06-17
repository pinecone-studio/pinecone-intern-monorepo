import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloStudentSchema } from './hello.schema';
import { studentsSchema } from './student.schema';
import { userTypeDefs } from './user.schema';

export const typeDefs = mergeTypeDefs([helloStudentSchema, studentsSchema, userTypeDefs]);
