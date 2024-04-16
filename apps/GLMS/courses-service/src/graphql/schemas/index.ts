import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';
import { lessonSchema } from './lesson.schema';
import { contentSchema } from './content.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema, lessonSchema,contentSchema]);
