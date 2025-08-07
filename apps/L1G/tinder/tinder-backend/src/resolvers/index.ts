import { uploadImages } from './mutations/image-upload';
import { login, signup, like, createInterest, updateInterest, deleteInterest, dislike, requestSignup, verifyOtp } from './mutations';
import { getAllInterests, getInterest, getusers } from './queries';

export const resolvers = {
  Query: {
    getusers,
    getAllInterests,
    getInterest,
  },
  Mutation: {
    login,
    requestSignup,
    verifyOtp,
    signup,
    like,
    createInterest,
    updateInterest,
    deleteInterest,
    dislike,
    uploadImages,
  },
};
