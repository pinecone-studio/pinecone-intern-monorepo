import { mergeTypeDefs } from '@graphql-tools/merge';
import { assessmentTypeDefs } from './assessment.schema';
import { helloAssessmentSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([assessmentTypeDefs, helloAssessmentSchema]);
