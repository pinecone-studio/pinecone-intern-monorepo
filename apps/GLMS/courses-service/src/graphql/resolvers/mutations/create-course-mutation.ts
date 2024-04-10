import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';

export const createCourse: MutationResolvers['createCourse'] = async (_, { title, content, thumbnail }) => {
  const newObj = new courseModel({ title, content, thumbnail });
  await newObj.save();
  return newObj;
};
