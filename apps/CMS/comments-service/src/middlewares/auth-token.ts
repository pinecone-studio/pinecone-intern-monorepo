import jwt from 'jsonwebtoken';
export const accessTokenAuth = async (req: {
  headers: {
    authorization: string;
  };
}) => {
  const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    throw new Error('There is no valid token');
  }
  try {
    const decoded = jwt.verify(accessToken, 'secret-key');

    return decoded;
  } catch (error) {
    throw new Error('Failed to auth');
  }
};
