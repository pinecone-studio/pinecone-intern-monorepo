import {  QueryResolvers } from '@/graphql/generated';
import  graphqlErrorHandler , { errorTypes } from '../error';
import { EmployeeModel } from '@/models/employee';

export const getEmployeeRequest: QueryResolvers['getEmployeeRequest'] = async (_, { id }) => {
  try {
    const employee = await EmployeeModel.findById(id);
    const { department, ladderLevel } = employee!;

    const departmentWorkers = await EmployeeModel.find({
      department,
      ladderLevel: { $in: ['3', '1', '2'], $ne: ladderLevel },
    });

    const filteredWorkers = departmentWorkers.filter((worker) =>
      worker.ladderLevel !== undefined && ladderLevel !== undefined && worker.ladderLevel <= ladderLevel
  );

  if (filteredWorkers.length === 0) {
    const hrEmployees = await EmployeeModel.find({ department: "BACK_OFFICE" ,jobTitle:'HR'});

    return hrEmployees;
}
    return filteredWorkers;
  } catch (error) {
    throw graphqlErrorHandler({message: "Something went wrong"}, errorTypes.BAD_REQUEST)

  }
};