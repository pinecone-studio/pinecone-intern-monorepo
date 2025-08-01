import * as Query from './queries';
import * as Mutation from './mutations';
import { User } from 'src/models/user.model';
import { Category } from 'src/models/category.model';

export const resolvers = {
  User: {
    userId: (parent: User) => parent._id.toString(),
  },
  Category: {
    categoryId: (parent: Category) => parent._id.toString(),
  },
  Query,
  Mutation,
};
