import { createUser } from './user/create-user';
import { login } from './user/login';
import { refreshToken } from './user/refreshtoken';

import { requestOTP } from './otp/request-otp';
import { verifyOTP } from './otp/verify-otp';

export const mutationResolvers = {
  createUser,
  login,
  refreshToken,
  requestOTP,
  verifyOTP,
};

