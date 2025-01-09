import { MutationResolvers, Request } from '../../../generated';
import { RequestModel } from '../../../models';

export const updateRequest: MutationResolvers['updateRequest'] = async (_: unknown, { input, id }) => {
  const { reasonRefuse, requestType } = input;

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
  console.log(ResponseRequest);

  return ResponseRequest as Request;
};
