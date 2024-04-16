import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-lesson-model';
import { GraphQLError } from 'graphql';

export const createLesson: MutationResolvers['createLesson'] = async (_, { title, thumbnail, position }) => {
  try {
    const newLesson = await lessonModel.create({ title, thumbnail, position });
    return newLesson.toObject();
  } catch (error) {
    throw new GraphQLError('An unknown error occurred'); 

  }
  }

