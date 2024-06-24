import { mergeTypeDefs } from '@graphql-tools/merge';
import { coursesTypeDefs } from './courses.schema';

export const typeDefs = mergeTypeDefs([coursesTypeDefs]);
