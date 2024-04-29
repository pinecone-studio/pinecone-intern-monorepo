import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/course-model';
import { GraphQLError } from 'graphql';

export const createCourse: MutationResolvers['createCourse'] = async (_, { courseInput }) => {
  try {
    return await courseModel.create(courseInput);
  } catch (error) {
    console.log(error);
    throw new GraphQLError('An unknown error occurred');
  }
};
