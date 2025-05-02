import { MutationCreateUserArgs } from "../../../generated";
import { USER_MODEL } from "../../../models/user";

export const createUser = async (_: any, args: MutationCreateUserArgs) => {
  const { email } = args; 

  if (!email || !email.trim()) {
    throw new Error('Email is required');
  }
  
  const existingUser = await USER_MODEL.findOne({ email });
  if (existingUser) throw new Error('user already exist');

  const newUser = await USER_MODEL.create({
    email,
  });

  return {
      id: newUser._id.toString(),
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };
};
