import { like } from './mutations/like';
import { login } from './mutations/login';
import { signup } from './mutations/signup';
import { getusers } from './queries/getusers';

export const resolvers = {
  Query: {
    getusers,
  },
  Mutation: {
    login,
    signup,
    like,
  },
};
