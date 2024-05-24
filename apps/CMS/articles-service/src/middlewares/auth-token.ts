import jwt from 'jsonwebtoken';
export const accessTokenAuth = async ({ authorization }: { authorization: string }) => {
  if (!authorization) {
    throw new Error('There is no valid token');
  }
  try {
    const decoded = jwt.verify(authorization, 'secret-key');

    return decoded;
  } catch (error) {
    throw new Error('Failed to auth');
  }
};
