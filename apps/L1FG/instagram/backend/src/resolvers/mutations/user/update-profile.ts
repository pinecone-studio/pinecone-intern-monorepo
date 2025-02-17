import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateProfileImage: MutationResolvers['updateProfileImage'] = async (_, { image }, { userId }) => {
  const profileImage = await UserModel.findByIdAndUpdate({ _id: userId }, { profileImage: image }, { new: true });
  console.log('image', image);

  const result = profileImage.profileImage;
  return result;
};
