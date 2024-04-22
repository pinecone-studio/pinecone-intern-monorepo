import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/lesson-model';
import { GraphQLError } from 'graphql';

export const createLesson: MutationResolvers['createLesson'] = async (_, { lessonInput }) => {
  try {
    const newLesson = await lessonModel.create(lessonInput);
    return newLesson.toObject();
  } catch (error) {
    throw new GraphQLError('An unknown error occurred'); 
  }
};
