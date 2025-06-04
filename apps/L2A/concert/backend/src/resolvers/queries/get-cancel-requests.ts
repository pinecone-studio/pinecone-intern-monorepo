import { RequestModel } from '../../models/request.model';
import { catchError } from '../../utils/catch-error';

export const getCancelRequests = async () => {
  try {
    const requests = await RequestModel.find().populate('user').populate('concert').populate('ticket').exec();
    return requests;
  } catch (err) {
    return catchError(err);
  }
};
