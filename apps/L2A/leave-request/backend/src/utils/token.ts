import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
}

export function generateRefreshToken(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}
export function verifyRefreshToken(token: string): { userId: string } {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    return decoded;
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
}



