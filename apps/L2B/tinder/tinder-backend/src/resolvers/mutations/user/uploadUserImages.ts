import { userModel } from '../../../models/user.model';

export const uploadUserImages = async (_: unknown, { userId, imageUrls }: { userId: string; imageUrls: string[] }) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    console.log('Saving image URLs for user:', userId);
    console.log('Image URLs:', imageUrls);

    user.images = imageUrls;
    await user.save();

    return true;
  } catch (error) {
    console.error('Error uploading user images:', error);
    throw new Error('Failed to upload user images');
  }
};
