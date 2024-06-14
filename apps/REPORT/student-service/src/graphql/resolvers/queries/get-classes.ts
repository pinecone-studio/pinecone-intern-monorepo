import { QueryResolvers } from '@/graphql/generated';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';

export const getClasses: QueryResolvers['getClasses'] = async () => {
  try {
    const classes = await ClassModel.find({});
    return classes;
  } catch (error) {
    throw new GraphQLError("Couldn't find classes");
  }
};
