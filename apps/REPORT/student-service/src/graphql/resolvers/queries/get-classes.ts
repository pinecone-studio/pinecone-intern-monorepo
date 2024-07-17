import { QueryResolvers } from '@/graphql/generated';
import { ClassModel } from '@/graphql/models/class.model';
import { GraphQLError } from 'graphql';

export const getClasses: QueryResolvers['getClasses'] = async (_, { search }) => {
  try {
    let query = {};

    if (search) {
      query = {
        $or: [{ name: { $regex: search, $options: 'i' } }, { teachers: { $regex: search, $options: 'i' } }, { 'students.firstName': { $regex: search, $options: 'i' } }],
      };
    }

    const classes = await ClassModel.find(query);
    return classes;
  } catch (error) {
    throw new GraphQLError("Couldn't find classes");
  }
};
