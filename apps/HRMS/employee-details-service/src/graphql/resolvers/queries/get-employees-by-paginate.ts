import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const getEmployeesByPaginate: QueryResolvers['getEmployeesByPaginate'] = async (_, { employeeDetailsfilterInput, paginationInput }) => {
  const { limit, page } = paginationInput;
  const { searchedValue } = employeeDetailsfilterInput;

  const searchQuery = { firstName: { $regex: searchedValue, $options: 'i' } };

  const employees = await EmployeeModel.find(searchQuery)
    .limit(limit)
    .skip(limit * (page - 1));
  const totalEmployees = await EmployeeModel.find({}).countDocuments();

  return { employees, totalEmployees };
};
