import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from "./user.schema"    
import { eventTypeDefs } from "./event.schema" 
import { ticketTypeDefs } from "./ticket.schema"
import { paymentTypeDefs } from "./payment.schema"

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  eventTypeDefs,
  ticketTypeDefs,
  paymentTypeDefs,
]);