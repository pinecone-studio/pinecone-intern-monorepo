import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/course-model';
import { GraphQLError } from 'graphql';

export const createCourse: MutationResolvers['createCourse'] = async (_, { courseInput }) => {
  try {
    const newContent = await courseModel.create(courseInput);
    return newContent;
  } catch (error) {
    throw new GraphQLError('An unknown error occurred');
  }
};
