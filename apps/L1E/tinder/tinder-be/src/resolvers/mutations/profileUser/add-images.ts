import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const addImages: MutationResolvers['addImages'] = async (_: unknown, { _id, input }) => {
  const { images } = input;

  const user = await userModel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }

  const totalImages = user.images.length + images.length;

  if (totalImages > 6) {
    throw new Error('You can only upload up to 6 images');
  }

  await userModel.findByIdAndUpdate(_id, { images: [...images, ...user.images] });

  return user;
};
