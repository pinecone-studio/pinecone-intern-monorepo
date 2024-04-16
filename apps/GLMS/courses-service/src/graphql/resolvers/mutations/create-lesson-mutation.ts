import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-lesson-model';

export const createLesson: MutationResolvers['createLesson'] = async (_, { title, thumbnail, position }) => {
  try {
    const newLesson = await lessonModel.create({ title, thumbnail, position });
    return newLesson.toObject();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred');
    }
  }
  }

