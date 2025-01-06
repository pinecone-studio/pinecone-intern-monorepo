import { MutationResolvers } from '../../../generated';
import { EmployeeModel, RequestModel } from '../../../models';

export const createRequest: MutationResolvers['createRequest'] = async (_: unknown, { input }) => {
  const { employeeId, leadEmployeeId, requestStatus, selectedDay, reason, startTime, endTime } = input;

  const employee = await EmployeeModel.findById({ _id: employeeId });
  const leadEmployee = await EmployeeModel.findById({ _id: leadEmployeeId });
  const newDate = new Date(selectedDay as string);

  const ResponseRequest = await RequestModel.create({
    employeeId: employee,
    leadEmployeeId: leadEmployee,
    requestStatus,
    reason,
    selectedDay: newDate,
    reasonRefuse: '',
    startTime,
    endTime,
    requestType: 'PENDING',
    updatedAt: new Date(),
    createdAt: new Date(),
  });
  return ResponseRequest;
};
