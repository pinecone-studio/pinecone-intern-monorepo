import { QueryResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const getRequestById: QueryResolvers['getRequestById'] = async (_, _id) => {
  const getOne = await LeaveRequestModel.findById(_id);
  return getOne;
};
