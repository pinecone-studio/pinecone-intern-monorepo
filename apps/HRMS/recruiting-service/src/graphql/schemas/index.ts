import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloRecruitingSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloRecruitingSchema]);
