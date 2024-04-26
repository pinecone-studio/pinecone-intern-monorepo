import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';
import { lessonSchema } from './lesson.schema';
import { sectionSchema } from './section.schema';
import { courseSchema } from './course.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema, sectionSchema, lessonSchema, courseSchema]);
