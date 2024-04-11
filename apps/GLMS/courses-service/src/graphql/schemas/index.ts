import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';
import { courseSchema } from './course.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema, courseSchema]);
