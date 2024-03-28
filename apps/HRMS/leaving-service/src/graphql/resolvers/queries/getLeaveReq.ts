import { LeaveReqModel } from '../../../models';
import { QueryResolvers } from '../../generated';

export const getLeaveRequestById: QueryResolvers['getLeaveRequestById'] = async (_, { _id }) => {
  const leaveReq = await LeaveReqModel.findById(_id);

  if (!leaveReq) {
    throw new Error('Leave Request not found');
  }

  return leaveReq;
};
