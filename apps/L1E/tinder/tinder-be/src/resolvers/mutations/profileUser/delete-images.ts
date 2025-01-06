import { DeleteInput } from '../../../generated';
import { userModel } from '../../../models/user/user.model';

export const deleteImage = async (_: unknown, { _id, input }: { _id: string; input: DeleteInput }) => {
  const { image } = input;
  console.log(image);

  const user = await userModel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }

  user.images = user.images.filter((image: string) => !image.includes(image));

  await user.save();
  return user;
};
