import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateFullName: MutationResolvers['updateFullName'] = async (_, { name }, { userId }) => {
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const UpdatedFullName = await UserModel.findByIdAndUpdate(userId, { fullName: name }, { new: true, runValidations: true });

  return UpdatedFullName.fullName;
};
