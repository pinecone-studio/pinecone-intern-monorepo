import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { PropertyTypeDefs } from './property-features.schema';
import { UserTypeDefs } from './user.schema';
import { PostTypeDefs } from './post-schema';

export const typeDefs = mergeTypeDefs([PostTypeDefs, CommonTypeDefs, PropertyTypeDefs, UserTypeDefs]);
