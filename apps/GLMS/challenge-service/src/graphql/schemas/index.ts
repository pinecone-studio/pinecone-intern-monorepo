import { mergeTypeDefs } from '@graphql-tools/merge';
import { quizTypeDefs } from './quiz.schema';

export const typeDefs = mergeTypeDefs([quizTypeDefs]);
