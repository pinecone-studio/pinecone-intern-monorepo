import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';

export const createLesson: MutationResolvers['createLesson'] = async (_, { lessonInput }) => {
  try {
    return await lessonModel.create(lessonInput);
  } catch (error) {
    throw new GraphQLError('An unknown error occurred');
  }
};
