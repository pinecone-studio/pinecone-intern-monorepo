import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const getRequests = async () => {
  const getAllRequests = await LeaveRequestModel.find();
  return getAllRequests;
};
