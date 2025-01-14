import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as HotelTypeDefs } from './hotel.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, HotelTypeDefs]);
