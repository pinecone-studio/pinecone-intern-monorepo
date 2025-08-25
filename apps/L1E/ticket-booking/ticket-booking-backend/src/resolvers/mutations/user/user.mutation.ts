import { User } from "src/models/user.model";
import { 
  MutationCreateUserArgs, 
  MutationUpdateUserArgs, 
  MutationDeleteUserArgs,
  ResolversParentTypes 
} from "../../../generated";

// Helper function to build update fields
const buildUpdateFields = (updates: {
  fullName?: string;
  email?: string;
  role?: string;
  phone?: string;
}) => {
  const updateFields: Partial<typeof updates> = {};
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      updateFields[key as keyof typeof updates] = value;
    }
  });
  return updateFields;
};

export const userMutations = {
  createUser: async (
    _: ResolversParentTypes['Mutation'], 
    { email, fullName, password, role, phone }: MutationCreateUserArgs
  ) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const user = new User({ 
        email, 
        fullName,
        password, 
        role: role || 'USER',
        phone 
      });
      
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  updateUser: async (
    _: ResolversParentTypes['Mutation'], 
    { _id, fullName, email, role, phone }: MutationUpdateUserArgs
  ) => {
    try {
      const updateFields = buildUpdateFields({ fullName, email, role, phone });
      
      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  
  deleteUser: async (
    _: ResolversParentTypes['Mutation'], 
    { _id }: MutationDeleteUserArgs
  ) => {
    try {
      const deletedUser = await User.findByIdAndDelete(_id);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};