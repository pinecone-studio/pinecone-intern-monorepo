import { userModel } from '../models';

export const checkIfUserExist = async (input: string | number) => {
  const userExist = await userModel.findOne({ input });
  if (userExist) {
    throw new Error('Хэрэглэгч бүртгэгдсэн байна.');
  }
};
