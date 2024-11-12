import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as RoomTypeDefs } from './room.schema';
import { typeDefs as HotelTypeDefs} from "./hotel.schema";
import { typeDefs as HotelAmenityTypeDefs} from "./hotel-ameneties.schema"
import { typeDefs as AmenityTypeDefs } from "./amenity.schema"

export const typeDefs = mergeTypeDefs([CommonTypeDefs, RoomTypeDefs, HotelAmenityTypeDefs, HotelTypeDefs, AmenityTypeDefs]);
