import { QueryResolvers } from '@/graphql/generated';
import  EmployeeModel  from '@/graphql/model/employee';




export const getEmployee = async () => {
 
  const employeeDepart = await EmployeeModel.find();
  return employeeDepart;
};
