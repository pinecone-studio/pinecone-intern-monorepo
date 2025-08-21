import { User } from "src/models/user.model";
import { 
  MutationCreateUserArgs, 
  MutationUpdateUserArgs, 
  MutationDeleteUserArgs,
  ResolversParentTypes 
} from "../../../generated";

export const userMutations = {
  createUser: async (
    _: ResolversParentTypes['Mutation'], 
    { email, name }: MutationCreateUserArgs
  ) => {
    // Note: I noticed a mismatch - your mutation uses 'name' but creates with different fields
    // You may need to adjust based on your actual User model structure
    const user = new User({ email, name });
    return await user.save();
  },
  
  updateUser: async (
    _: ResolversParentTypes['Mutation'], 
    { _id, name, email }: MutationUpdateUserArgs
  ) => {
    const updateFields: Partial<{ name?: string; email?: string }> = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    
    return await User.findByIdAndUpdate(_id, updateFields, { new: true });
  },
  
  deleteUser: async (
    _: ResolversParentTypes['Mutation'], 
    { _id }: MutationDeleteUserArgs
  ) => {
    return await User.findByIdAndDelete(_id);
  },
};