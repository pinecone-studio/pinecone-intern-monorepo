import { User } from "src/models/user.model";
import { 
  QueryGetUserArgs,
  ResolversParentTypes 
} from "../../..//generated"; 

export const userQueries = {
  getUser: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetUserArgs
  ) => {
    return await User.findById(_id);
  },
  
  getUsers: async (_: ResolversParentTypes['Query']) => {
    return await User.find();
  },
};