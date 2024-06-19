import { MutationResolvers } from '@/graphql/generated';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';
export const updateClass: MutationResolvers['updateClass'] = async (_, { input }) => {
  const { _id, name, teachers, endDate, startDate, classType } = input;
  try {
    const updatedClass = await ClassModel.findByIdAndUpdate(_id, { name, teachers, endDate, startDate, classType }, { new: true });
    if (!updatedClass) throw new GraphQLError('Class not found');
    return updatedClass;
  } catch (error) {
    throw new GraphQLError('Failed to update class');
  }
};
