import { StudentsModel } from '@/graphql/models/student.models';
import { MutationResolvers } from '@/graphql/generated';

export const createStudent: MutationResolvers['createStudent'] = async (_, { input }) => {
  try {
    const newStudent = await StudentsModel.create(input);
    return newStudent;
  } catch (error) {
    console.log(error);
  }
};
