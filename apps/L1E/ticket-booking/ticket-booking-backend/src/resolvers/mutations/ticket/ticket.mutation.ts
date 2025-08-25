import { Ticket } from "src/models/ticket.model";
import { 
  MutationCreateTicketArgs, 
  MutationUpdateTicketArgs, 
  MutationDeleteTicketArgs,
  ResolversParentTypes 
} from "../../../generated";

export const ticketMutations = {
  createTicket: async (
    _: ResolversParentTypes['Mutation'], 
    { eventId, userId, price }: MutationCreateTicketArgs
  ) => {
    try {
      const ticket = new Ticket({ 
        eventId, 
        userId, 
        price,
        status: 'AVAILABLE'
      });
      
      const savedTicket = await ticket.save();
      return savedTicket;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },
  
  updateTicket: async (
    _: ResolversParentTypes['Mutation'], 
    { _id, status }: MutationUpdateTicketArgs
  ) => {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(_id, { status }, { new: true });
      if (!updatedTicket) {
        throw new Error('Ticket not found');
      }
      return updatedTicket;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  },
  
  deleteTicket: async (
    _: ResolversParentTypes['Mutation'], 
    { _id }: MutationDeleteTicketArgs
  ) => {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(_id);
      if (!deletedTicket) {
        throw new Error('Ticket not found');
      }
      return deletedTicket;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    }
  },
};
