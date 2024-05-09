import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const getEmployeesByPaginate: QueryResolvers['getEmployeesByPaginate'] = async (_, { employeeDetailsfilterInput, paginationInput }) => {
  const { limit, page } = paginationInput;
  const { searchedValue, employmentStatus, jobTitle } = employeeDetailsfilterInput;

  const searchQuery = { firstName: { $regex: searchedValue, $options: 'i' }, employmentStatus: { $regex: employmentStatus, $options: 'i' }, jobTitle: { $regex: jobTitle, $options: 'i' } };
  const employees = await EmployeeModel.find(searchQuery)
    .limit(limit)
    .skip(limit * (page - 1));
  const totalEmployees = await EmployeeModel.find(searchQuery).countDocuments();

  return { employees, totalEmployees };
};
