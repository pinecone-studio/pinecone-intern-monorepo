import { Event } from "src/models/event.model";
import { 
  QueryGetEventArgs,
  ResolversParentTypes 
} from "../../../generated"; 
import mongoose from 'mongoose';

export const eventQueries = {
  getEvent: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetEventArgs
  ) => {
    try {
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return null;
      }
      return await Event.findById(_id);
    } catch (error) {
      return null;
    }
  },
  
  getEvents: async (_: ResolversParentTypes['Query']) => {
    return await Event.find();
  },
};
