import * as User from './user';
import * as Event from './event';
import * as Ticket from './ticket';
import * as Payment from './payment';

export const Mutation = {
  ...User,
  ...Event,
  ...Ticket,
  ...Payment,
};