import mongoose from "mongoose";
import { MutationResolvers } from "src/generated"
import { Usermodel } from "src/models/user";

export const updateProfile: MutationResolvers['updateProfile'] = async (_, { id, name, email, dateOfBirth, genderPreferences, bio, interests, profession, schoolWork, images }) => {
  const updatedUser = await Usermodel.findByIdAndUpdate(
    id,
    // new mongoose.Types.ObjectId(id),
    {
      name,
      email,
      dateOfBirth,
      genderPreferences,
      bio,
      interests,
      profession,
      schoolWork,
      images
    },
    { new: true }
  );
  if (!updatedUser) {
    throw new Error('User not found');
  }
    return updatedUser;
  }