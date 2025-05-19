import { userModel } from '../models';

export const checkIfUserExist = async (input: string | number) => {
  const userExist = await userModel.findOne({ email: input });
  if (userExist) {
    throw new Error('Хэрэглэгч бүртгэлтэй байна!');
  }
};
