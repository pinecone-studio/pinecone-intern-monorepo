import * as Query from './queries';
import { createPost } from './mutations';

export const resolvers = {
  Query,
  Mutation: {
    createPost
  }
};
