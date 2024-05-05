import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const getEmployeesByPaginate: QueryResolvers['getEmployeesByPaginate'] = async (_, { paginationInput }) => {
  const { limit, page } = paginationInput;
  const employees = await EmployeeModel.find({})
    .limit(limit)
    .skip(limit * (page - 1));
  const totalEmployees = await EmployeeModel.find({}).countDocuments();

  return { employees, totalEmployees };
};
