import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-course-model';

export const createLessons: MutationResolvers['createLessons'] = async (_, { title, thumbnail, position }) => {
  const newLesson = await lessonModel.create({ title, thumbnail, position });
  return newLesson.toObject();
};
