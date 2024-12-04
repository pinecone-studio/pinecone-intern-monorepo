import { MutationResolvers, Response } from '../../../generated';
import { accessTokenModel, userModel } from '../../../models';
import bcrypt from 'bcrypt';

export const passwordRecovery: MutationResolvers['passwordRecovery'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error('User not found');

  const accessToken = await accessTokenModel.findOneAndDelete({ email });
  if (!accessToken) throw new Error('Access Token expired or not found');

  const saltRounds = parseInt(process.env.SALTROUNDS as string);
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  await userModel.updateOne(
    {
      email,
    },
    {
      password: hash,
    }
  );

  return Response.Success;
};
