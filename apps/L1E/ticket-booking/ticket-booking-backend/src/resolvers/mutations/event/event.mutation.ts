import { Event } from "src/models/event.model";
import { 
  MutationCreateEventArgs, 
  MutationUpdateEventArgs, 
  MutationDeleteEventArgs,
  ResolversParentTypes 
} from "../../../generated";
import mongoose from 'mongoose';

export const eventMutations = {
  createEvent: async (
    _: ResolversParentTypes['Mutation'], 
    { title, description, date, location }: MutationCreateEventArgs
  ) => {
    try {
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid date format');
      }
      
      const event = new Event({ 
        title, 
        description, 
        date: eventDate, 
        location,
        createdBy: '507f1f77bcf86cd799439011' 
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
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid ObjectId format');
      }
      
      const updates = [
        ['title', title],
        ['description', description],
        ['date', date ? new Date(date) : undefined],
        ['location', location]
      ].filter(([, value]) => value !== undefined);
      
      const updateData = Object.fromEntries(updates);
      
      // Validate date if provided
      if (updateData.date && isNaN(updateData.date.getTime())) {
        throw new Error('Invalid date format');
      }
      
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
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid ObjectId format');
      }
      
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
