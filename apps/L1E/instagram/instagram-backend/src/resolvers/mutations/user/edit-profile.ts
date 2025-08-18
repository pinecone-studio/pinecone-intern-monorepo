import { User } from '../../../models/user.model';

interface EditProfileArgs {
  userId: string;
  fullName?: string;
  userName?: string;
  bio?: string;
  isPrivate?: boolean;
  profileImage?: string;
}

interface EditProfileResponse {
  success: boolean;
  message: string;
  user: any;
}

export const editProfile = async (_: unknown, args: EditProfileArgs): Promise<EditProfileResponse> => {
  const { userId, ...updateData } = args;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
        user: null,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    return {
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    console.error('Edit profile error:', error);
    return {
      success: false,
      message: 'Failed to update profile',
      user: null,
    };
  }
}; 