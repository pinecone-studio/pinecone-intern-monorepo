import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloRecruitingSchema } from './hello.schema';
import { Job } from './job.schema';
import { Applicant } from './applicant.schema';
export const typeDefs = mergeTypeDefs([helloRecruitingSchema, Job, Applicant]);
