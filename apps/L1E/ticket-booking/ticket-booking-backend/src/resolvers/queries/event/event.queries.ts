import { Event } from "src/models/event.model";
import { 
  QueryGetEventArgs,
  ResolversParentTypes 
} from "../../../generated"; 

export const eventQueries = {
  getEvent: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetEventArgs
  ) => {
    return await Event.findById(_id);
  },
  
  getEvents: async (_: ResolversParentTypes['Query']) => {
    return await Event.find();
  },
};
