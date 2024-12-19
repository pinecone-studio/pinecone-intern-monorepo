import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as EmplooyeeTypeDefs } from './emplooyee.schema';
import { typeDefs as RequestTypeDefs } from './request.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, EmplooyeeTypeDefs, RequestTypeDefs]);
