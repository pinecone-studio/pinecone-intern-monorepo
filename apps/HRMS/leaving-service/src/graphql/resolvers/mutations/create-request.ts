import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const createLeaveRequest: MutationResolvers['createLeaveRequest'] = async (_, { requestInput }) => {
  const { description, declinedReasoning, totalHour, leaveType } = requestInput;
  const create = await LeaveRequestModel.create({
    description,
    declinedReasoning,
    totalHour,
    leaveType,
  });

  return create;
};
