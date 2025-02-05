import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { concertTypeDefs } from './concert.schema';
import { UserTypeDefs } from './user.schema';
import { ticketTypeDefs } from './ticket.schema';
import { orderTypeDefs } from './order.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, concertTypeDefs, UserTypeDefs, ticketTypeDefs, orderTypeDefs]);
