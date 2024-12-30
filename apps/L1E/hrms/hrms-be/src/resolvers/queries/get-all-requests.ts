import { QueryResolvers } from '../../generated';
import { RequestModel } from '../../models';

export const getAllRequests: QueryResolvers['getAllRequests'] = async (_: unknown, { limit }) => {
  const requests = await RequestModel.find().limit(limit ?? 1);
  if (requests.length===0) {
    throw new Error('There is no employees');
  }
  return requests;
};
