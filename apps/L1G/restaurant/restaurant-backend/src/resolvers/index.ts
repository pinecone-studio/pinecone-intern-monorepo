import * as Query from './queries';
import * as Mutation from './mutations';

export const resolvers = {
  User: {
    userId: (parent) => parent._id.toString(),
  },
  Query,
  Mutation,
};
