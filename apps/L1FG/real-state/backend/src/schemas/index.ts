import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { PropertyTypeDefs } from './property-features.schema';
import { UserTypeDefs } from './user.schema';
import { OwnerTypeDefs } from './owner-schema';

export const typeDefs = mergeTypeDefs([OwnerTypeDefs, CommonTypeDefs, PropertyTypeDefs, UserTypeDefs]);
