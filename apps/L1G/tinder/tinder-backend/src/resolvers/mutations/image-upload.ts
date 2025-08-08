import { MutationResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';

export const uploadImages: MutationResolvers['uploadImages'] = async (_, { images }, context) => {
  try {
    console.log('userId in context:', context.userId);

    if (!context?.userId) {
      console.error('Missing userId in context');
      throw new Error('Unauthorized');
    }

    const updatedUser = await Usermodel.findByIdAndUpdate(context.userId, { $push: { images: { $each: images } } }, { new: true });

    if (!updatedUser) {
      console.error('User not found with ID:', context.userId);
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error in uploadImages mutation:', error);
    throw new Error('Failed to upload images');
  }
};
