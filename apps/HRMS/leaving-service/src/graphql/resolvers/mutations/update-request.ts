import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const approveRequest: MutationResolvers['approveRequest'] = async (_, _id) => {
  const request = await LeaveRequestModel.findByIdAndUpdate(_id, { status: 'APPROVED' }, { new: true });
  return request;
};

export const declineRequest: MutationResolvers['declineRequest'] = async (_, _id) => {
  const request = await LeaveRequestModel.findByIdAndUpdate(_id, { status: 'DECLINED' }, { new: true });
  return request;
};
