import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';
import { errorTypes, graphqlErrorHandler } from '../error';
import { sendMail } from '@/mail/mail-sender';

export const createLeaveRequestHours: MutationResolvers["createLeaveRequestHours"] = async (_, { requestInput }) => {
  try{
    const { employeeId, startDateString, endDateString, description, leaveType, superVisor, durationType, email, substitute } = requestInput;
  
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)
    const startHour = startDate.getHours()
    const endHour =  endDate.getHours()
  
    const totalHour = Math.abs(endHour - startHour);
  
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
    const newEndDate = endDateString.slice(0,9)
    await sendMail(email!, description, substitute!, leaveType, newEndDate)
    return create;
  }catch(error) {
    throw graphqlErrorHandler({message:"Bolsonguie"}, errorTypes.BAD_USER_INPUT)
  }
};