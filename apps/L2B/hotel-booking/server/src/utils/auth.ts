import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../generated';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: User) => {
  return jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyPassword = async (user: User, password: string) => {
  return bcrypt.compare(password, user.password);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
