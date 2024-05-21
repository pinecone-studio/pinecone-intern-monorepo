import jwt from 'jsonwebtoken';
import { MutationResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const login: MutationResolvers['login'] = async (_, { input }) => {
  try {
    const { emailorPhone } = input;
    const employee = await EmployeeModel.findOne({
      $or: [{ email: emailorPhone }, { phone: emailorPhone }],
    });

    if (!employee) {
      throw graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND);
    }

    const id = employee.id;
    const firstName = employee.firstName;
    const lastName = employee.lastName;
    const email = employee.email;
    const imageUrl = employee.imageUrl
    const jobTitle = employee.jobTitle
    const ladderLevel = employee.ladderLevel
    const department = employee.department


    const token = jwt.sign({ id, firstName, email, lastName , imageUrl , ladderLevel , jobTitle ,department }, 'secret-key');

    return { token, message: 'Амжилттай нэвтэрлээ' };
  } catch (error) {
    if (error instanceof GraphQLError) throw error;
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};