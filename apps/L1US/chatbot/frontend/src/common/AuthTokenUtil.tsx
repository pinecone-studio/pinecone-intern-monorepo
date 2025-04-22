import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  iat: number;
  exp: number;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimeInSeconds;
  } catch (error) {
    console.error('Error decoding token: ', error);
    return true;
  }
};
