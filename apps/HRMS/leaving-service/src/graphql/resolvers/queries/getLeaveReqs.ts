import { LeaveReqModel } from '../../../models';
import { QueryResolvers } from '../../generated';

export const getLeaveRequests: QueryResolvers['getLeaveRequests'] = async () => {
  const leaveReq = await LeaveReqModel.find({});

  if (!leaveReq) {
    throw new Error('Leave Request not found');
  }

  return leaveReq;
};
