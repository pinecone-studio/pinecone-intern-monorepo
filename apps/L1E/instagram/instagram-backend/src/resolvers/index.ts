import * as Query from './queries';
import { createPost } from './mutations';
import { login, register } from './mutations/user';

export const resolvers = {
  Query,
  Mutation: {
    createPost,
    login,
    register,
  }
};
