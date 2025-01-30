import { catchError } from './catch-error';
import { UnauthenticatedError } from './error';

export const authenticate = (userId: string | null) => {
  try {
    if (!userId) {
      throw new UnauthenticatedError('Та нэвтэрнэ үү');
    }
  } catch (error) {
    catchError(error);
  }
};
