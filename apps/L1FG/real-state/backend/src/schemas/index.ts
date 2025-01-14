import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { PropertyTypeDefs } from './property-features.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, PropertyTypeDefs]);
