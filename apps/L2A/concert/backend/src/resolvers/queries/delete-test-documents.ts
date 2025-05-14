import { userModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const deleteTestDocs = async () => {
  try {
    await userModel.deleteMany({
      email: /cypress/i,
    });

    return true;
  } catch (err) {
    catchError(err);
  }
};
