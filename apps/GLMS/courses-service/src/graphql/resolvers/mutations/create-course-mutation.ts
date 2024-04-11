import { MutationResolvers } from '@/graphql/generated';
import courseModel from '@/model/create-course-model';

export const createCourse: MutationResolvers['createCourse'] = async (_, { content,title,thumbnail,position}) => {
  const newObj = await courseModel.create({ content,title,thumbnail,position});
  return newObj.toObject();
};
