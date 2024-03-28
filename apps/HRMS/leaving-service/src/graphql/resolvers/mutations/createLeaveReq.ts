import { MutationResolvers } from '@/graphql/generated';
import { LeaveReqModel } from '../../../models';

export const createLeaveRequest: MutationResolvers['createLeaveRequest'] = async (_, { requestInput }) => {
  const leaveRequest = await LeaveReqModel.create(requestInput);

  return leaveRequest;
};
