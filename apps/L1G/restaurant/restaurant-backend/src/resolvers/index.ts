import * as Query from './queries';
import * as Mutation from './mutations';
import { User } from 'src/models/user.model';

export const resolvers = {
  User: {
    userId: (parent: User) => parent._id.toString(),
  },
  Query,
  Mutation,
};
