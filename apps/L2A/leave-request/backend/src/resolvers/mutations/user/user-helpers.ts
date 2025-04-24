import { User } from '../../../models/models';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  if (!emailRegex.test(email)) {
    throw new Error('Email must be valid');
  }
}

export function validateRole(role: string) {
  if (role !== 'admin' && role !== 'manager' && role !== 'employeer') {
    throw new Error('Role must be valid');
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
