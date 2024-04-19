import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';

export const createLeaveRequestDays: MutationResolvers["createLeaveRequestDays"] = async (_, { requestInput }) => {
  const { employeeId, startDateString, endDateString, description, leaveType, superVisor, durationType } = requestInput;

  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)

  const createdLeaveRequests = []
  const totalHour = 8;
  const daysTime = Math.abs(endDate.getTime() - startDate.getTime());
      
  const absenceDays = Math.ceil(daysTime / (1000 * 60 * 60 * 24));
  for (let i = 0; i < absenceDays; i++) {
      const clonedStartDate = new Date(startDate);
      if (clonedStartDate.getDay() !== 6 && clonedStartDate.getDay() !== 0) {
          const create = await LeaveRequestModel.create({
              employeeId,
              startDate: clonedStartDate,
              description,
              leaveType,
              superVisor,
              totalHour,
              durationType
          });
          createdLeaveRequests.push(create)
        }
    startDate.setDate(startDate.getDate() + 1);
  }

  return createdLeaveRequests
};
