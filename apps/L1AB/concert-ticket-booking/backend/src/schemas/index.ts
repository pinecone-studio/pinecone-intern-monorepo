import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as BookingTypeDefs } from './booking.schema';
import { typeDefs as EventTypeDefs } from './event.schema';
import { typeDefs as VenueTypeDefs } from './venue.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, BookingTypeDefs, EventTypeDefs, VenueTypeDefs]);
