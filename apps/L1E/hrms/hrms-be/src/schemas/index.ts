import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as EmplooyeeTypeDefs } from './employee.schema';
import { typeDefs as RequestTypeDefs } from './requests.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, EmplooyeeTypeDefs, RequestTypeDefs]);
