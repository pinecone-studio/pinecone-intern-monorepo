import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Usermodel } from 'src/models/user';
import { SignUpArgs } from 'src/types';
const checkEmailExists = async (email: string) => {
  const existing = await Usermodel.findOne({ email });
  if (existing) {
    throw new Error('Email already exists');
  }
};

export const signup = async (
  _: unknown,
  args: SignUpArgs
): Promise<{
  id: string;
  email: string;
  name: string;
  likedBy: string[];
  likedTo: string[];
}> => {
  const { email, password, name } = args;

  await checkEmailExists(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Usermodel({
    email,
    password: hashedPassword,
    name,
    likedBy: [],
    likedTo: [],
  });

  const savedUser = await user.save();

  return {
    id: savedUser._id.toString(),
    email: savedUser.email,
    name: savedUser.name,
    likedBy: savedUser.likedBy.map((id: Types.ObjectId) => id.toString()),
    likedTo: savedUser.likedTo.map((id: Types.ObjectId) => id.toString()),
  };
};
