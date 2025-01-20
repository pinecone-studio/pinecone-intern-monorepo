/* eslint-disable complexity */
import { Request, RequestStatus, RequestType, RequestUpdateInput } from '../../../generated';
import { EmployeeModel, RequestModel } from '../../../models';

export const updateRequest = async (_: unknown, { input, id }: { input: RequestUpdateInput; id: string }) => {
  const { reasonRefuse, requestType } = input;

  const type = requestType;

  if (type === RequestType.Approved) {
    const request = await RequestModel.findById(id);

    if (request.requestStatus === RequestStatus.Free) {
      const employee = await EmployeeModel.findById(request.employeeId);

      const { id, freeLimit } = employee;

      const limit = freeLimit - 1;

      await EmployeeModel.findByIdAndUpdate(id, {
        freeLimit: limit,
      });
    }
    if (request.requestStatus === RequestStatus.Remote) {
      const employee = await EmployeeModel.findById(request.employeeId);

      const { id, paidLeaveLimit } = employee;

      const limit = paidLeaveLimit - 1;

      await EmployeeModel.findByIdAndUpdate(id, {
        paidLeaveLimit: limit,
      });
    }
    if (request.requestStatus === RequestStatus.PaidLeave) {
      const employee = await EmployeeModel.findById(request.employeeId);

      const { id, remoteLimit } = employee;

      const limit = remoteLimit - 1;

      await EmployeeModel.findByIdAndUpdate(id, {
        remoteLimit: limit,
      });
    }
  }

  const updatedAt = new Date();

  const ResponseRequest = await RequestModel.findByIdAndUpdate(
    id,
    {
      reasonRefuse,
      requestType,
      updatedAt,
    },
    { new: true }
  ).populate('employeeId leadEmployeeId');

  return ResponseRequest as Request;
};
