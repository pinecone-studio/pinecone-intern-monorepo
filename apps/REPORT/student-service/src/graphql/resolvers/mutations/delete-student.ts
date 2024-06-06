import { MutationResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';
import { StudentsModel } from '@/graphql/models/student.models';

export const deleteStudent: MutationResolvers['deleteStudent'] = async (_, { input }) => {
  try {
    const user = await StudentsModel.findByIdAndDelete(input.studentId);
    if (!user) {
      throw new GraphQLError('Алдаа гарлаа');
    }
    return user._id;
  } catch (error) {
    throw new GraphQLError('Алдаа гарлаа');
  }
};
