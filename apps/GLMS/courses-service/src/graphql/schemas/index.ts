import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';
import { lessonSchema } from './lesson.schema';
import { sectionSchema } from './section.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema, sectionSchema,lessonSchema]);
