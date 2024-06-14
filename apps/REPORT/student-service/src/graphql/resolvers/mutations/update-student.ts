import { MutationResolvers } from '@/graphql/generated/index';
import { GraphQLError } from 'graphql';
import { StudentsModel } from '@/graphql/models/student.models';

export const updateStudent: MutationResolvers['updateStudent'] = async (_, { updateInput }) => {
  const { _id, firstName, lastName, studentCode, profileImgUrl, classId, phoneNumber, email } = updateInput;
  try {
    const updateStudent = await StudentsModel.findByIdAndUpdate(_id, { firstName, lastName, studentCode, profileImgUrl, classId, phoneNumber, email });
    if (!updateStudent) {
      throw new GraphQLError('Could not find Student');
    }
    return updateStudent._id;
  } catch (e) {
    throw new GraphQLError('Cannot update student');
  }
};
