import { MutationResolvers } from '../../generated';
import { RequestModel } from '../../models/request.model';
import { catchError } from '../../utils/catch-error';

export const changeStatus: MutationResolvers['changeStatus'] = async (_, { requestId }) => {
  try {
    const request = await RequestModel.findById(requestId);
    if (!request) throw new Error('Хүсэлт олдсонгүй!');
    const updateRequest = await RequestModel.findByIdAndUpdate(request.id, { status: 'APPROVED' });
    return updateRequest;
  } catch (err) {
    catchError(err);
  }
};
