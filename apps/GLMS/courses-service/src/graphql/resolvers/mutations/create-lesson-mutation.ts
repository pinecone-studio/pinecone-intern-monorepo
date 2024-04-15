import { MutationResolvers } from '@/graphql/generated';
import lessonModel from '@/model/create-course-model';

export const createLessons: MutationResolvers['createLessons'] = async (_, { title, thumbnail, position }) => {
  const newObj = await lessonModel.create({ title, thumbnail, position });
  return newObj.toObject();
};
