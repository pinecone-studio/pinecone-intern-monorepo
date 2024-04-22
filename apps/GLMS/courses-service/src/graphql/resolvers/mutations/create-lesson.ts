import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-lesson-model';
import { GraphQLError } from 'graphql';

export const createLesson: MutationResolvers['createLesson'] = async (_, { lessonInput }) => {
  console.log(lessonInput)
  try {
    const newLesson = await lessonModel.create(lessonInput);
    console.log(newLesson)
    return newLesson.toObject();
  } catch (error) {
    throw new GraphQLError('An unknown error occurred'); 
  }
};
