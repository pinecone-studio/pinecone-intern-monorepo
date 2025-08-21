import { MutationResolvers } from "src/generated";
import { Usermodel } from "src/models/user";
import mongoose from "mongoose";

const buildUpdateData = (fields: {
  name?: string | null;
  email?: string | null;
  dateOfBirth?: string | null;
  genderPreferences?: string | null;
  gender?: string | null;
  bio?: string | null;
  interests?: string[] | null;
  profession?: string | null;
  schoolWork?: string | null;
  images?: string[] | null;
}): Record<string, any> => {
  const updateData: Record<string, any> = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      updateData[key] = value;
    }
  });
  
  return updateData;
};

export const updateProfile: MutationResolvers['updateProfile'] = async (
  _,
  {
    id,
    name,
    email,
    dateOfBirth,
    genderPreferences,
    gender,
    bio,
    interests,
    profession,
    schoolWork,
    images
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user ID');
  }

  const userId = new mongoose.Types.ObjectId(id);
  const user = await Usermodel.findById(userId);
  if (!user) throw new Error('User not found');

  const updateData = buildUpdateData({
    name,
    email,
    dateOfBirth,
    genderPreferences,
    gender,
    bio,
    interests,
    profession,
    schoolWork,
    images
  });

  const updatedUser = await Usermodel.findOneAndUpdate(
    { _id: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new Error('User not found after update');

  return updatedUser;
};