import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloStudentSchema } from './hello.schema';
import { studentsSchema } from './student.schema';
import { classSchema } from './class.schema';
import { userTypeDefs } from './user.schema';

export const typeDefs = mergeTypeDefs([helloStudentSchema, studentsSchema, classSchema, userTypeDefs]);
