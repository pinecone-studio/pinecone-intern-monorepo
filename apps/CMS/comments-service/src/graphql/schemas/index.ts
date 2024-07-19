import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCommentsSchema } from './hello.schema';
import { cmsUserTypeDefs } from './cms-user.schema';
import { cmsLoginTypeDefs } from './cms-login.schema';

export const typeDefs = mergeTypeDefs([helloCommentsSchema, cmsUserTypeDefs, cmsLoginTypeDefs]);
