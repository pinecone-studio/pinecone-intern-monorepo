import { dislike } from './mutations/dislike';
import { getusers } from './queries/getusers';
import { getAllInterests, getInterest } from './queries';
import { createInterest, deleteInterest, like, login, signup, updateInterest } from './mutations';

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
