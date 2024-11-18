import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUpUser: MutationResolvers['signUpUser'] = async (_, { input }) => {
  const { email, password } = input;
  
  const user = await userModel.findOne({ email });
  
  if (user) throw new Error('Unable to process request');
  
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({ ...input, password: hash });

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.JWT_SECRET!
  );

  return {
    user: newUser,
    token,
  };
};
