import { MutationResolvers } from '@/graphql/generated';
import { LeaveRequestModel } from '@/graphql/model/leave-request';
import { errorTypes, graphqlErrorHandler } from '../error';

export const createLeaveRequestDays: MutationResolvers["createLeaveRequestDays"] = async (_, { requestInput }) => {
  try {
    const { employeeId, startDateString, endDateString, description, leaveType, superVisor, durationType } = requestInput;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const workDays = allWorkDays(startDate, endDate);

    const createdLeaveRequests = await Promise.all(workDays.map(async (date) => {
      const create = await LeaveRequestModel.create({
        employeeId,
        startDate: date,
        description,
        leaveType,
        superVisor,
        totalHour: 8,
        durationType
      });
      return create;
    }));

    return createdLeaveRequests;
  } catch (error) {
    throw graphqlErrorHandler({ message: "Bolsonguie" }, errorTypes.BAD_USER_INPUT);
  }
};

function allWorkDays(startDate: Date, endDate: Date): Date[] {
  const workDays: Date[] = [];
  const oneDay = 24 * 60 * 60 * 1000;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      workDays.push(new Date(currentDate));
    }
    currentDate.setTime(currentDate.getTime() + oneDay);
  }
  return workDays;
}
