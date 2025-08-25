import { Ticket } from "src/models/ticket.model";
import { 
  QueryGetTicketArgs,
  ResolversParentTypes 
} from "../../../generated"; 

export const ticketQueries = {
  getTicket: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetTicketArgs
  ) => {
    return await Ticket.findById(_id);
  },
  
  getTickets: async (_: ResolversParentTypes['Query']) => {
    return await Ticket.find();
  },
};
