import { MutationResolvers } from '../../../generated';
import { EmployeeModel, RequestModel } from '../../../models';

export const createRequest: MutationResolvers['createRequest'] = async (_: unknown, { input }) => {
  const { employeeId, leadEmployeeId, requestStatus, reason, reasonRefuse, startTime, endTime } = input;
  const employee = await EmployeeModel.findById(employeeId);
  const leadEmployee = await EmployeeModel.findById(leadEmployeeId);
  const Request = await RequestModel.create({
    employee,
    leadEmployee,
    requestStatus,
    reason,
    reasonRefuse,
    startTime,
    endTime,
    requestType: 'FREE',
    updatedAt: new Date(),
    createdAt: new Date(),
  });
  return Request;
};
