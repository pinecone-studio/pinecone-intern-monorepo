import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloRecruitingSchema } from './hello.schema';
import { Job } from './job.schema';

export const typeDefs = mergeTypeDefs([helloRecruitingSchema, Job]);
