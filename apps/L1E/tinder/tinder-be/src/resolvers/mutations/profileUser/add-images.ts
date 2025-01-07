import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const addImages: MutationResolvers['addImages'] = async (_: unknown, { _id, input }) => {
  const { images } = input;

  const User = await userModel.findById(_id);

  if (!User) {
    throw new Error('User not found');
  }

  const user = await userModel.findByIdAndUpdate(
    {
      _id: _id,
    },
    {
      images,
    },
    { new: true }
  );

  // user.images.push(...images);
  // await user.save();
  return user;
};
