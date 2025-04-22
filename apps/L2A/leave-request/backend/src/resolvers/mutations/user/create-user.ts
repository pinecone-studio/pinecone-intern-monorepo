import { User } from '../../../models/models';
import { validateEmail, checkIfUserExists } from './user-helpers';
import type { UserInput } from '../../../generated';

export async function createUser(_parent: any, args: UserInput) {
  const { username, email, profilePicture } = args;
  validateEmail(email);
  await checkIfUserExists({ username, email });
  try {
    const newUser = new User({ username, email, profilePicture });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}
