import lessonModel from '@/model/create-lesson-model';
import { GraphQLError } from 'graphql';
export const getLessons = async () => {
  try {
    return await lessonModel.find();
  } catch (error) {
    throw new GraphQLError('cannot find lesson'); 
  }
};