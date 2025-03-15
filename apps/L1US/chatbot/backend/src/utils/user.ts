import { isEmail, isStrongPassword } from 'validator';

export const validateRegisterUserInput = (email: string, password: string): void => {
  if (!isEmail(email)) throw new Error('Invalid email format');
  if (!isStrongPassword(password)) throw new Error('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character');
};