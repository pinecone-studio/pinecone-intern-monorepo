import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const deleteLeaveRequest: MutationResolvers['deleteLeaveRequest'] = async (_, _id) => {
  const deleteReq = await LeaveRequestModel.findByIdAndDelete(_id);
  return deleteReq;
};
