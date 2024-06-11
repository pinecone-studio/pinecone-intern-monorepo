import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCoursesSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloCoursesSchema]);
