import { User } from "src/models/user.model";
import { 
  QueryGetUserArgs,
  ResolversParentTypes 
} from "../../..//generated"; 
import mongoose from 'mongoose';

export const userQueries = {
  getUser: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetUserArgs
  ) => {
    try {
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return null;
      }
      return await User.findById(_id);
    } catch (error) {
      return null;
    }
  },
  
  getUsers: async (_: ResolversParentTypes['Query']) => {
    return await User.find();
  },
};