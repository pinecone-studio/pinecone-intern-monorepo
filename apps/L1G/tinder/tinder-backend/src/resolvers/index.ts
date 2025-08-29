import { login, signup, like, createInterest, updateInterest, deleteInterest, dislike, requestSignup, verifyOtp, uploadImages, sendMessage, markMessagesAsSeen, unmatch } from './mutations';
import { forgotPassword } from './mutations/auth/forgot-password';
import { updateProfile } from './mutations/auth/update-profile';
import { getAllInterests, getChatWithUser, getInterest, getMe, getUser, getUserAllChatMessages, getusers } from './queries';

export const resolvers = {
  Query: {
    getusers,
    getAllInterests,
    getInterest,
    getUserAllChatMessages,
    getChatWithUser,
    getUser,
    getMe,
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
    forgotPassword,
    sendMessage,
    markMessagesAsSeen,
    updateProfile,
    unmatch,
  },
};
