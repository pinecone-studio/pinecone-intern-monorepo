import { QueryResolvers, Request } from '../../generated';
import { RequestModel } from '../../models';

export const getAllRequests: QueryResolvers['getAllRequests'] = async (_: unknown, { limit }) => {
  const requests = await RequestModel.find()
    .populate('employeeId leadEmployeeId')
    .limit(limit ?? 1);

  return requests as Request[];
};
