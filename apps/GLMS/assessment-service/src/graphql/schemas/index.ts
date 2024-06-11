import { mergeTypeDefs } from '@graphql-tools/merge';

import { helloAssessmentSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloAssessmentSchema]);
