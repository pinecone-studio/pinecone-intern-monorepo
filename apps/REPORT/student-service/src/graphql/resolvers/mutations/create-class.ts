import { MutationResolvers } from '@/graphql/generated';
import { ClassesModel } from '@/graphql/models/class.models';

export const createClass: MutationResolvers['createClass'] = async (_, { input }) => {
  try {
    const newClass = await ClassesModel.create(input);
    return newClass;
  } catch (error) {
    console.log(error);
  }
};
