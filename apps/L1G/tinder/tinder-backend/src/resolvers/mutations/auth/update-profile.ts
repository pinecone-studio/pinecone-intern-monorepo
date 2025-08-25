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
}): Record<string, unknown> => {
  const updateData: Record<string, unknown> = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      updateData[key] = value;
    }
  });
  
  return updateData;
};

const validateUserId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user ID');
  }
  return new mongoose.Types.ObjectId(id);
};

const processInterests = (interests: string[] | { _id: string }[] | undefined) => {
  if (interests === undefined) return undefined;
  return interests.map((i: string | { _id: string }) => 
    new mongoose.Types.ObjectId(typeof i === 'string' ? i : i._id)
  );
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
  const userId = validateUserId(id);
  
  const user = await Usermodel.findById(userId);
  if (!user) throw new Error('User not found');

  const updateData = buildUpdateData({
    name,
    email,
    dateOfBirth,
    genderPreferences,
    gender,
    bio,
    profession,
    schoolWork,
    images
  });

  const processedInterests = processInterests(interests);
  if (processedInterests !== undefined) {
    updateData.interests = processedInterests;
  }

  const updatedUser = await Usermodel.findOneAndUpdate(
    { _id: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new Error('User not found after update');

  return updatedUser;
};