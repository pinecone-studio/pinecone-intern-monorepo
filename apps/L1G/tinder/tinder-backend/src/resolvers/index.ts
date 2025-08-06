import { login, signup, like, createInterest, updateInterest, deleteInterest, dislike } from './mutations';
import { getAllInterests, getInterest, getusers } from './queries';

export const resolvers = {
  Query: {
    getusers,
    getAllInterests,
    getInterest,
  },
  Mutation: {
    login,
    signup,
    like,
    createInterest,
    updateInterest,
    deleteInterest,
    dislike,
  },
};
