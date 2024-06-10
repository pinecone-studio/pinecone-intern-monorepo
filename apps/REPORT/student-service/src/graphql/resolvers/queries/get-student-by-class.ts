import { StudentsModel } from '@/graphql/models/student.models';
import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getStudentsByClassId: QueryResolvers['getStudentsByClassId'] = async (_, { classId }) => {
  try {
    const students = await StudentsModel.find({ classId: classId });
    if (!students) {
      throw new GraphQLError('cannot find student');
    }
    return students;
  } catch (error) {
    throw new GraphQLError('cannot find student');
  }
};
