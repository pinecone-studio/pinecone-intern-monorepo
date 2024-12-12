import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as EventTypeDefs } from './event.schema';
import { typeDefs as ArtistTypeDefs } from './artist.schema';
import { typeDefs as BookingtypeDefs } from './booking.schema';
import { typeDefs as QRTypeDefs } from './qr.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, EventTypeDefs, ArtistTypeDefs, BookingtypeDefs, QRTypeDefs]);
