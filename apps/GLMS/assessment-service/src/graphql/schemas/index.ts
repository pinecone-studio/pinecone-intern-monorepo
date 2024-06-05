import { mergeTypeDefs } from '@graphql-tools/merge';
import { assessmentTypeDefs } from './assessment.schema';

export const typeDefs = mergeTypeDefs([assessmentTypeDefs]);
