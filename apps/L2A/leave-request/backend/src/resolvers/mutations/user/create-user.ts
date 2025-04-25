import { User } from '../../../models/models';
import { validateEmail, checkIfUserExists } from './user-helpers';
import type { UserInput } from '../../../generated';
import { generateAccessToken } from '../../../utils/token';
import { generateRefreshToken } from '../../../utils/token';

export async function createUser(_parent: any, args: { userArgs: UserInput }) {
  const { username, email, profilePicture } = args.userArgs;

  validateEmail(email);

  try {
    await checkIfUserExists({ username, email });

    const newUser = new User({ username, email, profilePicture });
    await newUser.save();

    const accessToken = generateAccessToken(newUser._id.toString());
    const refreshToken = generateRefreshToken(newUser._id.toString());

    return {
      accessToken,
      refreshToken,
      user: newUser,
    };
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}


