import bcrypt from 'bcryptjs';
import { Usermodel } from 'src/models/user.model';
import { MutationResolvers } from 'src/generated';

const checkEmailExists = async (email: string) => {
  const existing = await Usermodel.findOne({ email });
  if (existing) {
    throw new Error('Email already exists');
  }
};

export const signup: MutationResolvers['signup'] = async (_, { email, password, name, genderPreferences, dateOfBirth, bio, interests, profession, schoolWork, images }) => {
  await checkEmailExists(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Usermodel({
    email,
    password: hashedPassword,
    name,
    genderPreferences,
    dateOfBirth,
    bio,
    interests,
    profession,
    schoolWork,
    images,
    likedBy: [],
    likedTo: [],
  });

  const savedUser = await user.save();
  return {
    id: savedUser._id.toString(),
    email: savedUser.email,
    name: savedUser.name,
    genderPreferences: savedUser.genderPreferences,
    dateOfBirth: savedUser.dateOfBirth,
    bio: savedUser.bio,
    interests: savedUser.interests,
    profession: savedUser.profession,
    schoolWork: savedUser.schoolWork,
    images: savedUser.images,
    likedBy: (savedUser.likedBy || []).map((id: string) => id.toString()),
    likedTo: (savedUser.likedTo || []).map((id: string) => id.toString()),
  };
};
