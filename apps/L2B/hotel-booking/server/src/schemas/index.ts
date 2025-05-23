import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { HotelTypeDefs } from './hotel.schema';
import { RoomTypeDefs } from './room.shema';
import { BookingTypeDefs } from './booking.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, authTypeDefs, BookingTypeDefs, HotelTypeDefs, RoomTypeDefs]);
