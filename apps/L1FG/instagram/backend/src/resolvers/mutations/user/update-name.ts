import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateName: MutationResolvers['updateName'] = async (_, { name }, { userId }) => {
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const UpdatedUserName = await UserModel.findByIdAndUpdate(userId, { userName: name }, { new: true, runValidations: true });

  return UpdatedUserName.userName;
};
