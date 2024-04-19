import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';
import { errorTypes, graphqlErrorHandler } from '../error';

export const createLeaveRequestHours: MutationResolvers["createLeaveRequestHours"] = async (_, { requestInput }) => {
  try{
    const { employeeId, startDateString, endDateString, description, leaveType, superVisor, durationType } = requestInput;
  
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)
    const startHour = startDate.getHours()
    const endHour =  endDate.getHours()
  
    const totalHour = endHour - startHour;
  
    const create = await LeaveRequestModel.create({
        employeeId,
        startDate,
        startHour,
        endHour,
        description,
        leaveType,
        superVisor,
        totalHour,
        durationType
    });
    return create;
  }catch(error) {
    throw graphqlErrorHandler({message:"Bolsonguie"}, errorTypes.BAD_USER_INPUT)
  }
};
