import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const updateUser: MutationResolvers['updateUser'] = async (_, { input: { userId, username, email, password, profile } }) => {
  const updatedUser = await UserModel.findOneAndUpdate({ userId }, { username, email, password, profile });

  return updatedUser;
};
