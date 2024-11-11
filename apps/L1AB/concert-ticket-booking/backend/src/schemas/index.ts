import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './common.schema';
import { typeDefs as BookingTypeDefs } from './common.schema';
import { typeDefs as EventTypeDefs } from './common.schema';
import { typeDefs as VenueTypeDefs } from './common.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, BookingTypeDefs, EventTypeDefs, VenueTypeDefs]);
