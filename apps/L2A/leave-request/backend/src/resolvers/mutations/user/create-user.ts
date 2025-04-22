import { User } from '../../../models/models';
import { validateUserInput, checkIfUserExists } from './user-helpers';

export async function createUser(
  _parent: any,
  args: {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
  }
) {
  const { username, email, password, profilePicture } = args;
  validateUserInput({ username, email, password, profilePicture });
  await checkIfUserExists({ username, email });

  const newUser = new User({ username, email, password, profilePicture });
  await newUser.save();

  return newUser;
}
