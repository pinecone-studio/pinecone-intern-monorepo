import { User } from '../../../models/models';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUserInput({ username, email, profilePicture }: any) {
  checkUsername(username);
  checkEmail(email);
  checkProfilePicture(profilePicture);
}

function checkUsername(username: string) {
  if (!username) {
    throw new Error('Username is required');
  }
}

function checkEmail(email: string) {
  if (!email) {
    throw new Error('Email is required');
  }
  if (!emailRegex.test(email)) {
    throw new Error('Email must be valid');
  }
}

function checkProfilePicture(profilePicture: string) {
  if (!profilePicture) {
    throw new Error('Profile picture is required');
  }
}

export async function checkIfUserExists({ username, email }: { username: string; email: string }) {
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error('This username already exists');
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('This email already exists');
  }
}
