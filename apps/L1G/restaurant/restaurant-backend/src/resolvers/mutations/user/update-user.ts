import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const updateUser: MutationResolvers['updateUser'] = async (_, { _id, username, email, password, profile }) => {
  const author = await UserModel.findOneAndUpdate({ _id }, { username, email, password, profile });

  return author;
};
