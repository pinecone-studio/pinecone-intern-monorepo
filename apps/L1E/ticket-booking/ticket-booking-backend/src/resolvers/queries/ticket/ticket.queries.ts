import { Ticket } from "src/models/ticket.model";
import { 
  QueryGetTicketArgs,
  ResolversParentTypes 
} from "../../../generated"; 
import mongoose from 'mongoose';

export const ticketQueries = {
  getTicket: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetTicketArgs
  ) => {
    try {
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return null;
      }
      return await Ticket.findById(_id);
    } catch (error) {
      return null;
    }
  },
  
  getTickets: async (_: ResolversParentTypes['Query']) => {
    return await Ticket.find();
  },
};
