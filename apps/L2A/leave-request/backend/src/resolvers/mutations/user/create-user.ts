import { User } from '../../../models/models';
import { validateEmail, validateRole, checkIfUserExists } from './user-helpers';
import type { UserInput } from '../../../generated';

export async function createUser(_parent: any, args: UserInput) {
  const { username, email, profilePicture, role } = args;
  validateEmail(email);
  validateRole(role);
  try {
    await checkIfUserExists({ username, email });
    const newUser = new User({ username, email, profilePicture, role });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}
