import { User } from '../../../models/models';
import { validateUserInput, checkIfUserExists } from './user-helpers';

export async function createUser(
  _parent: any,
  args: {
    username: string;
    email: string;
    profilePicture: string;
  }
) {
  const { username, email, profilePicture } = args;
  validateUserInput({ username, email, profilePicture });
  await checkIfUserExists({ username, email });

  const newUser = new User({ username, email, profilePicture });
  await newUser.save();

  return newUser;
}
