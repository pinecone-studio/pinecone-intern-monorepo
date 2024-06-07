import { ClassesModel } from '@/graphql/models/class.models';
import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getClassesByType: QueryResolvers['getClassesByType'] = async (_, { classType }: any) => {
  try {
    const classes = await ClassesModel.find({ classType: classType });
    if (!classes) {
      throw new GraphQLError('cannot find class');
    }
    return classes;
  } catch (error) {
    throw new GraphQLError('cannot find class');
  }
};
