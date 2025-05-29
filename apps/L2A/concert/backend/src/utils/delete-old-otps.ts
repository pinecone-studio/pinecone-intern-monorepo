import { otpModel } from '../models';
import { catchError } from './catch-error';

export const DeleteOldOTPs = async () => {
  try {
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);

    await otpModel.deleteMany({
      createdAt: { $lte: tenMinAgo },
    });
  } catch (err) {
    catchError(err);
  }
};
