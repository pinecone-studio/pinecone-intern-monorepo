import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { _id }) => {
  const author = await UserModel.findOneAndDelete({ _id });

  return author;
};
