import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
  } from '../../../utils/token';
  
  export const refreshToken = async (_: any, { token }: { token: string }) => {
    try {
      const decoded = verifyRefreshToken(token) as { userId: string };
  
      const newAccessToken = generateAccessToken(decoded.userId);
      const newRefreshToken = generateRefreshToken(decoded.userId);
  
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Refresh token is invalid or expired');
    }
  };
  