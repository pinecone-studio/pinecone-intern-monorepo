import { QueryResolvers } from '@/graphql/generated';
import  EmployeeModel  from '@/graphql/model/employee';
import { GraphQLError } from 'graphql';




export const getEmployeeId:QueryResolvers['getEmployeeId'] = async (_ , {id}) => {
 
  const employee = await EmployeeModel.findById(id);
  const { department } = employee!;

  const departmentWorkers = await EmployeeModel.find({
     department,
    ladderLevel: {$in:["3","1","2",]}
   });
  return departmentWorkers ;
};
 // departmentWorker.filter(0<4)

  // departmentWorker.length[0]

  // const hrms = await EmployeeModel.find({jobtitte: "Hrms"})

  // const getAllRequests = await EmployeeModel.find({ department: '4' });