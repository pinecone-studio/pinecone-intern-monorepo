import * as Query from './queries';
import * as Mutation from './mutations';
import { User } from 'src/models/user.model';
import { Food } from 'src/models/food.model';

export const resolvers = {
  User: {
    userId: (parent: User) => parent._id.toString(),
  },
  Food: {
    foodId: (parent: Food) => parent._id.toString(),
  },
  Query,
  Mutation,
};
