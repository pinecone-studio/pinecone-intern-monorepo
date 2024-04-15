import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';
import { lessonSchema } from './course.schema';
import { contentSchema } from './content.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema, lessonSchema,contentSchema]);
