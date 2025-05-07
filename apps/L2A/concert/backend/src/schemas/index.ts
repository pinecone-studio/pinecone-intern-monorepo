import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { TicketTypeDefs } from './ticket.schema';
import { BookingTypeDefs } from './booking.schema';
import { ConcertTypeDefs } from './concert.schema';
import { EnumTypeDefs } from './enum.schema';
import { MutationTypeDefs } from './mutation.schema';
import { OTPTypeDefs } from './otp.schema';
import { QueryTypeDefs } from './queries.shema';
import { VenueTypeDefs } from './venue.schema';
import { SeatDataTypeDefs } from './seat.schema';

export const typeDefs = mergeTypeDefs([
  CommonTypeDefs,
  BookingTypeDefs,
  ConcertTypeDefs,
  EnumTypeDefs,
  MutationTypeDefs,
  OTPTypeDefs,
  QueryTypeDefs,
  TicketTypeDefs,
  UserTypeDefs,
  VenueTypeDefs,
  SeatDataTypeDefs,
]);
