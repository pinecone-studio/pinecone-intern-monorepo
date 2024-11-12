import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as HotelAmenitiesTypeDefs } from './hotel-ameneties.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, HotelAmenitiesTypeDefs]);