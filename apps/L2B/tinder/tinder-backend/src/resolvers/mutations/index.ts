import imageMutations from './image';
import userMutations from './user';

export * from './user/forget-password/forgot-match-otp';
export * from './user/forget-password/send-forgot-password-otp';
export * from './user/sign-up/add-user';
export * from './user/sign-up/delete-user';
export * from './user/sign-up/is-verified-user';
export * from './user/sign-up/send-otp';
export * from './user/forget-password/forgot-password';
export * from './user/sign-in/sign-in';
export * from './image/upload-image';

export default {
  Mutation: {
    ...imageMutations.Mutation,
    ...userMutations.Mutation,
  },
  Upload: imageMutations.Upload,
};
