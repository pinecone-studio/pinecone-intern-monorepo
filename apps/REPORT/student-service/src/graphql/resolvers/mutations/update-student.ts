import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { StudentsModel } from '@/graphql/models/student.models';

export const updateStudent: MutationResolvers['updateStudent'] = async (_, { updateInput }) => {
  const { _id, ...rest } = updateInput;
  try {
    const updateStudent = await StudentsModel.findByIdAndUpdate(_id, { ...rest });
    if (!updateStudent) {
      throw new GraphQLError('Could not find Student');
    }
    return updateStudent._id;
  } catch (e) {
    throw new GraphQLError('Cannot update student');
  }
};
