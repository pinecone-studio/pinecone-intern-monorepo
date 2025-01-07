import { DeleteInput } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const deleteImage = async (_: unknown, { _id, input }: { _id: string; input: DeleteInput }) => {
  const { image } = input;

  const user = await userModel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.images.includes(image)) {
    throw new Error('Image not found in user profile');
  }

  user.images = user.images.filter((img: string) => img !== image);

  await user.save();

  return user;
};
