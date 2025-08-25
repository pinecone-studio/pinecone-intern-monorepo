import { Event } from "src/models/event.model";
import { 
  MutationCreateEventArgs, 
  MutationUpdateEventArgs, 
  MutationDeleteEventArgs,
  ResolversParentTypes 
} from "../../../generated";

export const eventMutations = {
  createEvent: async (
    _: ResolversParentTypes['Mutation'], 
    { title, description, date, location }: MutationCreateEventArgs
  ) => {
    try {
      const event = new Event({ 
        title, 
        description, 
        date: new Date(date), 
        location,
        createdBy: '507f1f77bcf86cd799439011' // TODO: Get from auth context
      });
      
      const savedEvent = await event.save();
      return savedEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  updateEvent: async (
    _: ResolversParentTypes['Mutation'], 
    { _id, title, description, date, location }: MutationUpdateEventArgs
  ) => {
    try {
      const updates = [
        ['title', title],
        ['description', description],
        ['date', date ? new Date(date) : undefined],
        ['location', location]
      ].filter(([, value]) => value !== undefined);
      
      const updateData = Object.fromEntries(updates);
      
      const updatedEvent = await Event.findByIdAndUpdate(_id, updateData, { new: true });
      if (!updatedEvent) {
        throw new Error('Event not found');
      }
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
  
  deleteEvent: async (
    _: ResolversParentTypes['Mutation'], 
    { _id }: MutationDeleteEventArgs
  ) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(_id);
      if (!deletedEvent) {
        throw new Error('Event not found');
      }
      return deletedEvent;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};
