import { QueryResolvers, Request } from '../../generated';
import { RequestModel } from '../../models';

export const getRequestsByEmployee: QueryResolvers['getRequestsByEmployee'] = async (_: unknown, { employeeId }) => {
  const requests = await RequestModel.find({ employeeId: employeeId }).populate('employeeId leadEmployeeId');
  if (!requests || requests.length === 0) {
    throw new Error('No requests found for the provided employee ID');
  }

  return requests as Request[];
};
